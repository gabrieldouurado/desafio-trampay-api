import { Injectable } from '@nestjs/common';
import { UsersTokensRepository } from 'src/application/repositories/UsersTokensRepository';
import { PrismaService } from '../prisma.service';
import { UserToken } from 'src/application/entities/UserToken';
import { PrismaUserTokenMapper } from '../mappers/PrismaUsersTokenMapper';

@Injectable()
export class PrismaUsersTokensRepository implements UsersTokensRepository {
  constructor(private prisma: PrismaService) {}

  async create(userToken: UserToken): Promise<void> {
    const raw = PrismaUserTokenMapper.toPrisma(userToken);

    await this.prisma.userToken.create({
      data: raw,
    });
  }
}
