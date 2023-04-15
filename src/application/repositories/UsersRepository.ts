import { User } from '../entities/User';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
}
