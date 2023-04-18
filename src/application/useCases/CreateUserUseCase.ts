import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/UsersRepository';
import { User } from '../entities/User';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: IRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestException('User already existis.');
    }

    const user = new User();

    const hashedPassword = await hash(password, 8);

    Object.assign(user, {
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.craete(user);
  }
}
