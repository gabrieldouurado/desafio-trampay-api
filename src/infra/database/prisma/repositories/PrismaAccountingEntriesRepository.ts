import { Injectable } from '@nestjs/common';
import { AccountingEntries } from 'src/application/entities/AccountingEntries';
import { AccountingEntriesRepository } from 'src/application/repositories/AccountingEntriesRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountingEntriesRepository
  implements AccountingEntriesRepository
{
  constructor(private prisma: PrismaService) {}
  async create(accountingEntries: AccountingEntries): Promise<void> {
    await this.prisma.accountingEntries.create({
      data: accountingEntries,
    });
  }

  async findManyByRecipient(recipient: string): Promise<AccountingEntries[]> {
    const entries = await this.prisma.accountingEntries.findMany({
      where: {
        recipient,
      },
    });

    return entries;
  }

  async save(accountingEntries: AccountingEntries): Promise<void> {
    await this.prisma.accountingEntries.update({
      where: {
        id: accountingEntries.id,
      },
      data: accountingEntries,
    });
  }
}
