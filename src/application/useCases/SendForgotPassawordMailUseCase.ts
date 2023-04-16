import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/UsersRepository';
import { UserToken } from '../entities/UserToken';
import { UsersTokensRepository } from '../repositories/UsersTokensRepository';
import { randomUUID } from 'node:crypto';
import { addMinutes } from 'date-fns';

@Injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UsersTokensRepository,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    const expiresTokenMinutes = 1;

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
  }
}
