import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountingEntriesRepository } from '../repositories/AccountingEntriesRepository';
import { createReadStream, promises } from 'node:fs';
import { parse as csvParse } from 'csv-parse';
import { AccountingEntries } from '../entities/AccountingEntries';
import { isSameDay } from 'date-fns';

interface ImportEntries {
  releaseDate: string;
  recipient: string;
  value: string;
}

interface FilteredEntries {
  releaseDate: Date;
  recipient: string;
  totalValue: number;
}

@Injectable()
export class UploadCSVAccountingEntriesUseCase {
  constructor(
    private accountingEntriesRepository: AccountingEntriesRepository,
  ) {}

  loadEntries(path: string): Promise<ImportEntries[]> {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(path);

      const entries: ImportEntries[] = [];

      const parseFile = csvParse({
        delimiter: ';',
      });

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [releaseDate, recipient, value] = line;
          entries.push({
            releaseDate,
            recipient,
            value,
          });
        })
        .on('end', () => {
          promises.unlink(path);
          resolve(entries);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  checkHeader(header: ImportEntries): boolean {
    const validHeader = Object.keys(header);
    const receivedHeader = Object.values(header);

    return JSON.stringify(validHeader) === JSON.stringify(receivedHeader);
  }

  checkValidMonetaryValue(value: string): boolean {
    if (value.match(/\./g)) {
      return false;
    }

    if (value.match(/,/g).length > 1) {
      return false;
    }

    const checkDecimals = value.split(',');
    if (checkDecimals[1].length > 2) {
      return false;
    }

    return true;
  }

  checkIfdateIsValid(receivedDate: string): boolean {
    const date = new Date(receivedDate);

    return date instanceof Date && !isNaN(date.getTime());
  }

  async execute(filename: string): Promise<void> {
    const filePath = `./tmp/${filename}`;

    const entries = await this.loadEntries(filePath);

    if (!entries) {
      throw new BadRequestException('The file is empity.');
    }

    const headerIsValid = this.checkHeader(entries[0]);

    if (!headerIsValid) {
      throw new BadRequestException(
        `Document header error. Please use 'releaseDate;recipient;value' in header`,
      );
    }

    entries.shift();

    const filteredEntries: FilteredEntries[] = [];

    entries.forEach((entry, index, self) => {
      const entryAlreadyExists =
        index ===
        self.findIndex((selfEntry) => {
          return selfEntry.recipient === entry.recipient;
        });

      const entryReleaseDateIsValid = this.checkIfdateIsValid(
        entry.releaseDate,
      );

      if (!entryReleaseDateIsValid) {
        throw new BadRequestException(
          'Release date should be a forrmat YYYY-MM-DD',
        );
      }

      const entryValueIsValid = this.checkValidMonetaryValue(entry.value);

      if (!entryValueIsValid) {
        throw new BadRequestException(
          'The field value cannot have "." separetor\nShould be one ","\nShould be two decimals',
        );
      }

      if (entryAlreadyExists) {
        const formatEntry = {
          releaseDate: new Date(entry.releaseDate),
          totalValue: parseInt(entry.value.replace(',', '')),
          recipient: entry.recipient,
        };

        filteredEntries.push(formatEntry);
      } else {
        const entryIndex = filteredEntries.findIndex((filteredEntry) => {
          return filteredEntry.recipient === entry.recipient;
        });

        filteredEntries[entryIndex].totalValue += parseInt(
          entry.value.replace(',', ''),
        );
      }
    });

    filteredEntries.forEach(async (entry) => {
      const accountingEntries = new AccountingEntries();

      Object.assign(accountingEntries, {
        releaseDate: entry.releaseDate,
        recipient: entry.recipient,
        totalValue: entry.totalValue,
      });

      const recipientEntries =
        await this.accountingEntriesRepository.findManyByRecipient(
          accountingEntries.recipient,
        );

      const entriesInSameDay = recipientEntries.filter((entry) => {
        return isSameDay(entry.releaseDate, accountingEntries.releaseDate);
      });

      entriesInSameDay.forEach(async (entry) => {
        entry.deletedAt = new Date();

        await this.accountingEntriesRepository.save(entry);
      });

      await this.accountingEntriesRepository.create(accountingEntries);
    });
  }
}
