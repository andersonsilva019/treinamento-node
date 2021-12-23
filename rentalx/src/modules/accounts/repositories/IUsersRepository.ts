import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUpdateUserAvatarDTO } from '@modules/accounts/dtos/IUpdateUserAvatarDTO';

import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  update(data: IUpdateUserAvatarDTO): Promise<void>;
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
