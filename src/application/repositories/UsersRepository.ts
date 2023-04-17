import { User } from '../entities/User';

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export abstract class UsersRepository {
  abstract craete(data: CreateUser): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
}
