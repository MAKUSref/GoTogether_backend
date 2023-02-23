import uuid4 from "uuid4";
import { Coords } from "./Coords";

export enum USER_TYPE {
  User = 'User',
  Guest = 'Guest'
}

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  type: USER_TYPE;
  coords: Coords | undefined;
} 

class User implements IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  type: USER_TYPE;
  coords: Coords | undefined = undefined;

  constructor(name: string, login: string, password: string, type: USER_TYPE, id: string = uuid4()) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
    this.type = type;
  }
}

export default User;
