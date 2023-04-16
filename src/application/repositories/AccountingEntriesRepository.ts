import { AccountingEntries } from '../entities/AccountingEntries';

export abstract class AccountingEntriesRepository {
  abstract create(accountingEntries: AccountingEntries): Promise<void>;
  abstract findManyByRecipient(recipient: string): Promise<AccountingEntries[]>;
  abstract save(accountingEntries: AccountingEntries): Promise<void>;
}
