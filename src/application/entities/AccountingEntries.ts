import { randomUUID } from 'node:crypto';

export class AccountingEntries {
  id: string;

  releaseDate: Date;
  recipient: string;
  totalValue: number;

  deletedAt: Date;
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
      this.createdAt = new Date();
    }
  }
}
