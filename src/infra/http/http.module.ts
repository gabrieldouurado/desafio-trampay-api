import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/AuthenticateController';
import { AuthenticateUserUseCase } from 'src/application/useCases/AuthenticateUserUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthenticateController],
  providers: [AuthenticateUserUseCase],
})
export class HttpModule {}
