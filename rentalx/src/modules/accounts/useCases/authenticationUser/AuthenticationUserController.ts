import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';

export class AuthenticationUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticationUserUseCase = container.resolve(
      AuthenticationUserUseCase
    );

    const { user, token } = await authenticationUserUseCase.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}
