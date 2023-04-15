import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from 'src/application/repositories/UsersRepository';
import { PrismaUsersRepository } from './prisma/repositories/PrismaUsersRepository';
import { UsersTokensRepository } from 'src/application/repositories/UsersTokensRepository';
import { PrismaUsersTokensRepository } from './prisma/repositories/PrismaUsersTokensRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: UsersTokensRepository,
      useClass: PrismaUsersTokensRepository,
    },
  ],
  exports: [UsersRepository, UsersTokensRepository],
})
export class DatabaseModule {}
