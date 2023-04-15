import { randomUUID } from 'node:crypto';

export class UserToken {
  id: string;
  token: string;
  userId: string;
  expiresDate: Date;

  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
      this.createdAt = new Date();
    }
  }
}
