import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountController } from './controllers/AccountController';
import { AuthenticateUserUseCase } from 'src/application/useCases/AuthenticateUserUseCase';
import { SendForgotPasswordMailUseCase } from 'src/application/useCases/SendForgotPassawordMailUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [AuthenticateUserUseCase, SendForgotPasswordMailUseCase],
})
export class HttpModule {}
