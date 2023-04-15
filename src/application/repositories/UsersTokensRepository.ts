import { UserToken } from '../entities/UserToken';

export abstract class UsersTokensRepository {
  abstract create(userToken: UserToken): Promise<void>;
}
