import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const avatar = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id, column: avatar });

    return response.status(204).send();
  }
}
