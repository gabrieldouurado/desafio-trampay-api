import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from 'src/application/repositories/UsersRepository';
import { PrismaUsersRepository } from './prisma/repositories/PrismaUsersRepository';
import { UsersTokensRepository } from 'src/application/repositories/UsersTokensRepository';
import { PrismaUsersTokensRepository } from './prisma/repositories/PrismaUsersTokensRepository';
import { AccountingEntriesRepository } from 'src/application/repositories/AccountingEntriesRepository';
import { PrismaAccountingEntriesRepository } from './prisma/repositories/PrismaAccountingEntriesRepository';

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
    {
      provide: AccountingEntriesRepository,
      useClass: PrismaAccountingEntriesRepository,
    },
  ],
  exports: [
    UsersRepository,
    UsersTokensRepository,
    AccountingEntriesRepository,
  ],
})
export class DatabaseModule {}
