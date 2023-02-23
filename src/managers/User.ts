import { Coords } from "../model/Coords";
import User, { IUser, USER_TYPE } from "../model/User";
import UserRepository from "../repositories/User";

const userRepo = new UserRepository();

export const getUsers = async (): Promise<IUser[]> => {
  const users = await userRepo.getAll();

  return users;
}

export const getUser = async (id: string): Promise<IUser[]> => {
  const users = await userRepo.getUserById(id);

  return users;
}

export const createUser = async (name: string, login: string, password: string): Promise<boolean> => {  
  if (!name || !login || !password) return false;

  const isLoginUniq = (await userRepo.getUsersByLogin(login)).length === 0;

  if (!isLoginUniq) return false;

  const newUser = new User(name, login, password, USER_TYPE.User);

  const res = await userRepo.addUser(newUser);

  return res;
}

export const deleteUser = async (id: string): Promise<boolean> => {
  const [user] = await userRepo.getUserById(id);

  if (user === undefined || user === null ) {
    return false;
  }

  userRepo.deleteUser(id);

  return true;
}

export const loginUser = async (login: string, password: string): Promise<IUser | undefined> => {
  const [user] = await userRepo.getUsersByLogin(login);

  if (user === undefined || user === null ) return; // user doeas not exist
  if (user.password !== password) return; // bad password

  return user;
}

export const updateCoords = async (id: string, coords: Coords): Promise<boolean> => {
  const [user] = await userRepo.getUserById(id);

  if (user === undefined || user === null) return false; // user does not exist

  const res = userRepo.updateCoords(id, coords);

  return true;
}
