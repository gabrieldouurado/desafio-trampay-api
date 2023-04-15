import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersTokensRepository } from '../repositories/UsersTokensRepository';
import { isBefore } from 'date-fns';
import { UsersRepository } from '../repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

@Injectable()
export class ResetUserPasswordUseCase {
  constructor(
    private usersTokensRepository: UsersTokensRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new BadRequestException('Invalid token.');
    }

    const tokenHasExpires = isBefore(userToken.expiresDate, new Date());

    if (tokenHasExpires) {
      throw new BadRequestException('Token expired.');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    user.password = await hash(password, 8);
    user.updatedAt = new Date();

    await this.usersRepository.save(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
