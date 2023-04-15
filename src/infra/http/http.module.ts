import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountController } from './controllers/AccountController';
import { AuthenticateUserUseCase } from 'src/application/useCases/AuthenticateUserUseCase';
import { SendForgotPasswordMail } from 'src/application/useCases/SendForgotPassawordMail';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [AuthenticateUserUseCase, SendForgotPasswordMail],
})
export class HttpModule {}
