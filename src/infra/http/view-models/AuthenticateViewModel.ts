import { User } from 'src/application/entities/User';

export class AuthenticateViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
