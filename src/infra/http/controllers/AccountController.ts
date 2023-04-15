import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from 'src/application/useCases/AuthenticateUserUseCase';
import { AuthenticateBody } from '../dtos/AuthenticateBody';
import { AuthenticateViewModel } from '../view-models/AuthenticateViewModel';
import { SendForgotPasswordMail } from 'src/application/useCases/SendForgotPassawordMail';

@Controller('account')
export class AccountController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private sendForgotPasswordMail: SendForgotPasswordMail,
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
  async resetPassword(@Body() { email }) {
    await this.sendForgotPasswordMail.execute(email);
  }
}
