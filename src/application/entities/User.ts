import { randomUUID } from 'node:crypto';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
