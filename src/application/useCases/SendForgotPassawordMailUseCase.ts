import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/UsersRepository';
import { UserToken } from '../entities/UserToken';
import { UsersTokensRepository } from '../repositories/UsersTokensRepository';
import { randomUUID } from 'node:crypto';
import { addMinutes } from 'date-fns';
import { SendGridMailProvider } from 'src/providers/MailProvider/implementations/SendGridMailProvider';

@Injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UsersTokensRepository,
    private mailProvider: SendGridMailProvider,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    const expiresTokenMinutes = parseInt(process.env.EXPIRES_RESET_PASSOWORD);

    if (!user) {
      throw new NotFoundException('User does not exists.');
    }

    const userToken = new UserToken();

    const token = randomUUID();

    const expiresDate = addMinutes(new Date(), expiresTokenMinutes);

    Object.assign(userToken, {
      token,
      expiresDate,
      userId: user.id,
    });

    await this.usersTokensRepository.create(userToken);

    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject: 'Recuperação se senha',
      html: `<strong>Acesse o link para recuperar sua senha ${process.env.FRONTEND_URL}/reset-password/${token}</strong>`,
    };

    await this.mailProvider.sendMail(msg);
  }
}
