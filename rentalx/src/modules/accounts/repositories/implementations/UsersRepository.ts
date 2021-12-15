import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserAvatarDTO } from '../../dtos/IUpdateUserAvatarDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async update(data: IUpdateUserAvatarDTO): Promise<void> {
    const { user_id, column: avatar_file } = data;
    // UPDATE users SET avatar = avatar_file WHERE id = user_id
    await this.repository.update(user_id, { avatar: avatar_file });
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }
}
