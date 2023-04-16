import { AccountingEntries } from '../entities/AccountingEntries';

export abstract class AccountingEntriesRepository {
  abstract create(accountingEntries: AccountingEntries): Promise<void>;
}
