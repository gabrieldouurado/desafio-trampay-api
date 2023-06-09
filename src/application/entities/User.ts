import { randomUUID } from 'node:crypto';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
      this.createdAt = new Date();
    }
  }
}
