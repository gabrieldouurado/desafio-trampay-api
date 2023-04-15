import { UserToken } from '../entities/UserToken';

export abstract class UsersTokensRepository {
  abstract create(userToken: UserToken): Promise<void>;
  abstract findByToken(token: string): Promise<UserToken>;
  abstract deleteById(id: string): Promise<void>;
}
