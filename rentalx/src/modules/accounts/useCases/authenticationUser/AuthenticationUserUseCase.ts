import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IAuthenticationUserDTO } from '@modules/accounts/dtos/IAuthenticationUserDTO';
import { User } from '@modules/accounts/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IResponse {
  user: Omit<User, 'password'>;
  token: string;
}

@injectable()
export class AuthenticationUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    email,
    password,
  }: IAuthenticationUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const token = sign({}, 'f420fc990cadffcae629e64bdf0bf7c2', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        isAdmin: user.isAdmin,
        created_at: user.created_at,
        driver_license: user.driver_license,
        avatar: user.avatar,
      },
      token,
    };
  }
}
