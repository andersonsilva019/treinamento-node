import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserAvatarDTO } from '../dtos/IUpdateUserAvatarDTO';
import { User } from '../entities/User';

export interface IUsersRepository {
  update(data: IUpdateUserAvatarDTO): Promise<void>;
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
