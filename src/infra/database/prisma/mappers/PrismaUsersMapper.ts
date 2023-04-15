import { User } from 'src/application/entities/User';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      deletedAt: user.deletedAt,
      updatedAt: user.createdAt,
    };
  }
}
