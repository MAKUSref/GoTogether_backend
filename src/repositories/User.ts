import { IUser } from '../model/User';
import Redis from '../redis/Redis';

const KEY = 'users';

class UserRepository {
  redis = new Redis<IUser>(KEY);
  
  async addUser(user: IUser): Promise<boolean> {
    const res = await this.redis.addValue(user);
    return res;
  }

  async getAll(): Promise<IUser[]> {
    const users = await this.redis.getValues();
    return users;
  }

  async getUserById(id: string): Promise<IUser[]> {
    const users = await this.getAll();
    return users.filter((user: IUser) => user.id === id);
  }

  async getUsersByName(name: string): Promise<IUser[]> {
    const users = await this.getAll();
    return users.filter((user: IUser) => user.name === name);
  }

  async getUsersByLogin(login: string): Promise<IUser[]> {
    const users = await this.getAll();
    return users.filter((user: IUser) => user.login === login);
  }

  async deleteUser(id: string) {
    const users = (await this.getAll()).filter((user: IUser) => user.id !== id);
    await this.redis.setValues(users);
  }
}

export default UserRepository;
