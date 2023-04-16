import { Injectable } from '@nestjs/common';
import { AccountingEntriesRepository } from '../repositories/AccountingEntriesRepository';
import { createReadStream, promises } from 'node:fs';
import { parse as csvParse } from 'csv-parse';

interface ImportEntries {
  releaseDate: string;
  recipient: string;
  value: number;
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

  async execute(filename: string): Promise<void> {
    const filePath = `./tmp/${filename}`;

    const entries = await this.loadEntries(filePath);

    console.log('Entries', entries);
  }
}
