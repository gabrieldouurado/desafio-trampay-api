import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/UsersRepository';
import { User } from '../entities/User';

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

    Object.assign(user, {
      name,
      email,
      password,
    });

    await this.usersRepository.craete(user);
  }
}
