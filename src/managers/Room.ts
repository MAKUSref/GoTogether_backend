import Room, { IRoom } from "../model/Room";
import { USER_TYPE } from "../model/User";
import RoomRepository from "../repositories/Room";
import UserRepository from "../repositories/User";
import { generatePin } from './utils';

const roomRepo = new RoomRepository();
const userRepo = new UserRepository();

export const createRoom = async (userId: string, name: string): Promise<boolean> => {
  const [user] = await userRepo.getUserById(userId);

  if (!user) return false; // user does not exist
  if (user.type === USER_TYPE.Guest) return false; // Guest cannot make rooms
  if (!name) return false; // name cannot be empty string

  const pins = (await roomRepo.getAll()).map((room: IRoom) => room.pin);
  const uniqPin = generatePin(pins);

  const newRoom = new Room({name, hosts: [userId], pin: uniqPin});
  
  const addRoomSuccess = await roomRepo.addRoom(newRoom);

  return addRoomSuccess;
}

export const readRooms = async (): Promise<IRoom[]> => {
  const rooms = await roomRepo.getAll();

  return rooms;
}

export const readRoom = async (roomId: string): Promise<IRoom[]> => {
  const room = roomRepo.getByRoomId(roomId);

  return room;
}

export const readRoomByHostId = async (hostId: string): Promise<IRoom[]> => {
  const rooms = await roomRepo.getByHostId(hostId);

  return rooms;
}

export const readRoomByPin = async (pin: number): Promise<IRoom[]> => {
  const rooms = await roomRepo.getByRoomPin(pin);

  return rooms;
}

export const readRequestedRooms = async (userId: string): Promise<IRoom[]> => {
  const rooms = await roomRepo.getByRequestedUserId(userId);

  return rooms;
}

export const readAcceptedRooms = async (userId: string): Promise<IRoom[]> => {
  const rooms = await roomRepo.getByAcceptedUserId(userId);

  return rooms;
}

export const readProfileRooms = async (userId: string): Promise<{ host: IRoom[], user: IRoom[], request: IRoom[] }> => {
  const hostedRooms = await roomRepo.getByHostId(userId);
  const joinedRooms = await roomRepo.getByAcceptedUserId(userId);
  const requestedRooms = await roomRepo.getByRequestedUserId(userId);

  return {
    host: hostedRooms,
    user: joinedRooms,
    request: requestedRooms
  };
}

export const deleteRoom = async (roomId: string): Promise<boolean> => {
  const [room] = await roomRepo.getByRoomId(roomId);

  if (!room) return false;

  await roomRepo.deleteRoom(roomId);
  return true;
}

export const deleteFromUsers = async (roomId: string, userId: string, requestingUserId: string): Promise<boolean> => {
  const user = await userRepo.getUserById(userId);
  const requestingUser = await userRepo.getUserById(requestingUserId);
  const room = await roomRepo.getByRoomId(roomId);

  if (!user.length) return false; // user does not exist
  if (!requestingUser.length) return false; // requesting user does not exist
  if (!room.length) return false; // room does not exist
  if (!room[0].users.includes(userId)) return false; // there is no such user in user list
  if (!room[0].hosts.includes(requestingUserId)) return false; // only hosts from this room can delete other users

  return await roomRepo.deleteFromUserList(roomId, userId);
}

export const deleteFromHosts = async (roomId: string, userId: string, requestingUserId: string): Promise<boolean> => {
  const user = await userRepo.getUserById(userId);
  const requestingUser = await userRepo.getUserById(requestingUserId);
  const room = await roomRepo.getByRoomId(roomId);

  if (!user.length) return false; // user does not exist
  if (!requestingUser.length) return false; // requesting user does not exist
  if (!room.length) return false; // room does not exist
  if (!room[0].hosts.includes(userId)) return false; // there is no such user in hosts list
  if (!room[0].hosts.includes(requestingUserId)) return false; // only hosts from this room can delete other users

  return await roomRepo.deleteFromHostsList(roomId, userId);
}

export const deleteFromRequestedList = async (roomId: string, userId: string, requestingUserId: string): Promise<boolean> => {
  const user = await userRepo.getUserById(userId);
  const requestingUser = await userRepo.getUserById(requestingUserId);
  const room = await roomRepo.getByRoomId(roomId);

  if (!user.length) return false; // user does not exist
  if (!requestingUser.length) return false; // requesting user does not exist
  if (!room.length) return false; // room does not exist
  if (!room[0].requestingUsers.includes(userId)) return false; // there is no such user in requesting list
  if (!room[0].hosts.includes(requestingUserId)) return false; // only hosts from this room can delete other users

  return await roomRepo.deleteFromRequestedList(roomId, userId);
}

export const requestUserToRoom = async (pin: number, userId: string): Promise<boolean> => { 
  const user = await userRepo.getUserById(userId);
  const room = await roomRepo.getByRoomPin(pin);

  if (!user.length) return false; // user does not exist
  if (!room.length) return false; // room does not exist
  if (room[0].requestingUsers.includes(userId)) return false; // user already requests to room
  if (room[0].hosts.includes(userId)) return false; // user already belongs to hosts list
  if (room[0].users.includes(userId)) return false; // user already belongs to users list

  return await roomRepo.requestUserToRoom(pin, userId);
}

export const acceptRequest = async (roomId: string, userId: string): Promise<boolean> => {
  const user = await userRepo.getUserById(userId);
  const room = await roomRepo.getByRoomId(roomId);

  if (!user.length) return false; // user does not exist
  if (!room.length) return false; // room does not exist
  if (!room[0].requestingUsers.includes(userId)) return false; // there is no request from this user

  return await roomRepo.acceptUserRequest(roomId, userId);
}
