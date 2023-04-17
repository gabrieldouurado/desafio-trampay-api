import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountController } from './controllers/AccountController';
import { AuthenticateUserUseCase } from 'src/application/useCases/AuthenticateUserUseCase';
import { SendForgotPasswordMailUseCase } from 'src/application/useCases/SendForgotPassawordMailUseCase';
import { ResetUserPasswordUseCase } from 'src/application/useCases/ResetUserPasswordUseCase';
import { EntiresController } from './controllers/EntriesController';
import { UploadCSVAccountingEntriesUseCase } from 'src/application/useCases/UploadCSVAccountingEntriesUseCase';
import { CreateUserUseCase } from 'src/application/useCases/CreateUserUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController, EntiresController],
  providers: [
    AuthenticateUserUseCase,
    SendForgotPasswordMailUseCase,
    ResetUserPasswordUseCase,
    UploadCSVAccountingEntriesUseCase,
    CreateUserUseCase,
  ],
})
export class HttpModule {}
