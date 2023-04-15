import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from 'src/application/useCases/AuthenticateUserUseCase';
import { AuthenticateBody } from '../dtos/AuthenticateBody';
import { AuthenticateViewModel } from '../view-models/AuthenticateViewModel';
import { SendForgotPasswordMailUseCase } from 'src/application/useCases/SendForgotPassawordMailUseCase';

@Controller('account')
export class AccountController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase,
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
    await this.sendForgotPasswordMailUseCase.execute(email);
  }
}
