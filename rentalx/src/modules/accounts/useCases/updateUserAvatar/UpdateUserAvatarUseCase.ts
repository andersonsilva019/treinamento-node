import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { IUpdateUserAvatarDTO } from '../../dtos/IUpdateUserAvatarDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    user_id,
    column: avatar,
  }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    await this.usersRepository.update({
      user_id: user.id,
      column: avatar,
    });
  }
}
