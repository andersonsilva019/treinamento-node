import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryFake } from '@modules/accounts/repositories/fakes/UsersRepositoryFake';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';

import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';

let authenticationUserUseCase: AuthenticationUserUseCase;
let usersRepositoryFake: UsersRepositoryFake;
let createUserUseCase: CreateUserUseCase;

describe('#AuthenticatioUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryFake = new UsersRepositoryFake();
    authenticationUserUseCase = new AuthenticationUserUseCase(
      usersRepositoryFake
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryFake);
  });
  it('should be able to authentication an user', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '123456',
      driver_license: '123456A',
    };

    await createUserUseCase.execute(user);

    const response = await authenticationUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authentication an nonexistent user', () => {
    expect(async () => {
      await authenticationUserUseCase.execute({
        email: 'none@none.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authentication with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'John Doe',
        email: 'johndoe@johndoe.com',
        password: '123456',
        driver_license: '123456A',
      };

      await createUserUseCase.execute(user);

      await authenticationUserUseCase.execute({
        email: user.email,
        password: 'password-fake',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
