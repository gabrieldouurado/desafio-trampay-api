import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from 'src/application/useCases/AuthenticateUserUseCase';
import { AuthenticateBody } from '../dtos/AuthenticateBody';
import { AuthenticateViewModel } from '../view-models/AuthenticateViewModel';
import { SendForgotPasswordMailUseCase } from 'src/application/useCases/SendForgotPassawordMailUseCase';
import { ResetUserPasswordUseCase } from 'src/application/useCases/ResetUserPasswordUseCase';

@Controller('account')
export class AccountController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase,
    private resetUserPasswordUseCase: ResetUserPasswordUseCase,
  ) {}

  @Post('/authentication')
  async authenticate(@Body() { email, password }: AuthenticateBody) {
    const user = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    return AuthenticateViewModel.toHttp(user);
  }

  @Post('/send-mail-reset-password')
  async sendMailresetPassword(@Body() { email }) {
    await this.sendForgotPasswordMailUseCase.execute(email);
  }

  @Patch('reset-password')
  async resetPassword(@Body() { token, password }) {
    await this.resetUserPasswordUseCase.execute({ token, password });
  }
}
