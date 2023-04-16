import { Injectable } from '@nestjs/common';
import { AccountingEntries } from 'src/application/entities/AccountingEntries';
import { AccountingEntriesRepository } from 'src/application/repositories/AccountingEntriesRepository';

@Injectable()
export class PrismaAccountingEntriesRepository
  implements AccountingEntriesRepository
{
  async create(accountingEntries: AccountingEntries): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
