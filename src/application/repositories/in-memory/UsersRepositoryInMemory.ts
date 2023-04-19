import { User } from '../../entities/User';
import { UsersRepository } from '../UsersRepository';

export class UsersRepositoryInMemory implements UsersRepository {
  users: User[] = [];

  async craete(user: User): Promise<void> {
    const newUser = new User();

    Object.assign(newUser, user);

    this.users.push(newUser);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => {
      return user.id === id;
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => {
      return user.email === email;
    });

    return user;
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((findUser) => {
      return findUser.id === user.id;
    });

    this.users[userIndex] = { ...user };
  }
}
