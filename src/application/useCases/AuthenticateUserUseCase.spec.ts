import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { User } from '../entities/User';
import { hash } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';

let usersRepository: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

    const seedUser = new User();

    Object.assign(seedUser, {
      name: 'Jonh Due',
      email: 'johndue@email.com',
      password: await hash('john@123', 8),
    });

    await usersRepository.craete(seedUser);
  });

  it('should be able a authenticate user', async () => {
    const authenticate = await authenticateUserUseCase.execute({
      email: 'johndue@email.com',
      password: 'john@123',
    });

    expect(authenticate).toHaveProperty('id');
  });

  it('should no be able to authenticate user when invalid email', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'random@email.com',
        password: 'john@123',
      }),
    ).rejects.toEqual(new BadRequestException('Email of password incorrect.'));
  });

  it('should no be able to authenticate user when incorrect password', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'johndue@email.com',
        password: 'random',
      }),
    ).rejects.toEqual(new BadRequestException('Email of password incorrect.'));
  });
});
