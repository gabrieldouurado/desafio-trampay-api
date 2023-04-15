import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from 'src/application/useCases/AuthenticateUserUseCase';
import { AuthenticateBody } from '../dtos/AuthenticateBody';
import { AuthenticateViewModel } from '../view-models/AuthenticateViewModel';

@Controller('authentication')
export class AuthenticateController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  async authenticate(@Body() { email, password }: AuthenticateBody) {
    const user = await this.authenticateUserUseCase.execute({
      email,
      password,
    });

    return AuthenticateViewModel.toHttp(user);
  }
}
