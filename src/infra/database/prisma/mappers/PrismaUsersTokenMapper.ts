import { UserToken } from 'src/application/entities/UserToken';

export class PrismaUserTokenMapper {
  static toPrisma(userToken: UserToken) {
    return {
      id: userToken.id,
      token: userToken.token,
      expiresDate: userToken.expiresDate,
      userId: userToken.userId,
      createdAt: userToken.createdAt,
    };
  }
}
