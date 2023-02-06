import uuid4 from "uuid4";
import User, { IUser } from "./User";

export interface IRoom {
  id: string;
  name: string;
  hosts: string[];
  users: string[];
  requestingUsers: string[];
  pin: number;
}

type RoomProps = {
  id?: string;
  name: string;
  hosts: string[];
  users?: string[];
  requestingUsers?: string[];
  pin: number;
};

class Room implements IRoom {
  id: string;
  name: string;
  hosts: string[];
  users: string[];
  requestingUsers: string[];
  pin: number;

  constructor({
    id = uuid4(),
    name,
    hosts,
    users = [],
    requestingUsers = [],
    pin,
  }: RoomProps) {
    this.id = id;
    this.name = name;
    this.users = [...users];
    this.hosts = [...hosts];
    this.pin = pin;
    this.requestingUsers = [...requestingUsers];
  }
}

export default Room;
