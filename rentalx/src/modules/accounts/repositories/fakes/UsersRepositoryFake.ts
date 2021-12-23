import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserAvatarDTO } from '../../dtos/IUpdateUserAvatarDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryFake implements IUsersRepository {
  private users: User[] = [];

  async update({ user_id, column }: IUpdateUserAvatarDTO): Promise<void> {
    const user = this.findById(user_id);
    user[column] = column;
  }
  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}
