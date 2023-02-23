import { Request, Response } from "express";
import * as roomManager from "../managers/Room";

const X_USER_ID = 'x-user-id';

export const readRoom = async (req: Request, res: Response) => {
  const room = await roomManager.readRooms();

  if (room !== undefined && room !== null) {
    return res.status(200).json({ room });
  }

  return res.status(404).json({ room, message: "No rooms were found." });
};

export const readSingleRoom = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;

  const room = await roomManager.readRoom(roomId);

  if (room !== undefined && room !== null) {
    return res.status(200).json({ room });
  }

  return res.status(404).json({ room, message: "No rooms were found." });
}

export const readHostedRooms = async (req: Request, res: Response) => {
  const hostId = req.headers[X_USER_ID] as string;

  const room = await roomManager.readRoomByHostId(hostId);

  if (room !== undefined && room !== null) {
    return res.status(200).json({ room });
  }

  return res.status(404).json({ room, message: "No rooms were found." });
};

export const readRequestedRooms = async (req: Request, res: Response) => {
  const userId = req.headers[X_USER_ID] as string;

  const room = await roomManager.readRequestedRooms(userId);

  if (room !== undefined && room !== null) {
    return res.status(200).json({ room });
  }

  return res.status(404).json({ room, message: "No rooms were found." });
};

export const readAcceptedRooms = async (req: Request, res: Response) => {
  const userId = req.headers[X_USER_ID] as string;

  const room = await roomManager.readAcceptedRooms(userId);

  if (room !== undefined && room !== null) {
    return res.status(200).json({ room });
  }

  return res.status(404).json({ room, message: "No rooms were found." });
}

export const readProfileRooms = async (req: Request, res: Response) => {
  const userId = req.headers[X_USER_ID] as string;

  const rooms = await roomManager.readProfileRooms(userId);

  return res.status(200).json({...rooms});
}

export const readRoomByPin = async (req: Request, res: Response) => {
  const pin = req.params.pin;

  const room = await roomManager.readRoomByPin(Number(pin));

  if (room !== undefined && room !== null) {
    return res.status(200).json({ room });
  }

  return res.status(404).json({ room, message: "No rooms were found." });
}

export const createRoom = async (req: Request, res: Response) => {
  const userId = req.headers[X_USER_ID] as string;
  const { name } = req.body;

  const createRoomSuccess = await roomManager.createRoom(userId, name);

  if (createRoomSuccess) {
    return res.status(201).send({ message: "Room created." });
  }

  return res.status(400).send({ message: "Bad request!" });
};

export const deleteRoom = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;

  const deleteRoomSuccess = await roomManager.deleteRoom(roomId);

  if (deleteRoomSuccess) {
    return res.status(201).send({ message: "Room deleted." });
  }

  return res.status(404).send({ message: "Room with this id does not exist!" });
};

export const deleteFromUsers = async (req: Request, res: Response) => {
  const { roomId, userId }: { roomId: string, userId: string } = req.body;
  const requestingUserId = req.headers[X_USER_ID] as string;

  const deleteUserSuccess = await roomManager.deleteFromUsers(roomId, userId, requestingUserId);

  if (deleteUserSuccess) {
    return res.status(201).send({ message: "User deleted." });
  }

  return res.status(404).send({ message: "User not found!" });
}

export const deleteFromRequested = async (req: Request, res: Response) => {
  const { roomId, userId }: { roomId: string, userId: string } = req.body;
  const requestingUserId = req.headers[X_USER_ID] as string;

  const deleteUserSuccess = await roomManager.deleteFromRequestedList(roomId, userId, requestingUserId);

  if (deleteUserSuccess) {
    return res.status(201).send({ message: "User deleted." });
  }

  return res.status(404).send({ message: "User not found!" });
}

export const deleteFromHosts = async (req: Request, res: Response) => {
  const { roomId, userId }: { roomId: string, userId: string } = req.body;
  const requestingUserId = req.headers[X_USER_ID] as string;

  const deleteUserSuccess = await roomManager.deleteFromHosts(roomId, userId, requestingUserId);

  if (deleteUserSuccess) {
    return res.status(201).send({ message: "User deleted." });
  }

  return res.status(404).send({ message: "User not found!" });
}

export const requestUserToJoin = async (req: Request, res: Response) => {
  const { pin, userId }: { pin: string, userId: string } = req.body;  

  const isUserAdded = await roomManager.requestUserToRoom(Number(pin), userId);

  if (isUserAdded) {
    return res.status(201).send({ message: "User joined to room correctly." });
  }

  return res.status(400).send({ message: "User did not join!" });
};

export const acceptRequest = async (req: Request, res: Response) => {
  const { roomId, userId }: { roomId: string, userId: string } = req.body;
  const requestingUserId = req.headers[X_USER_ID] as string;

  const isUserAccepted = await roomManager.acceptRequest(roomId, userId, requestingUserId);

  if (isUserAccepted) {
    return res.status(201).send({ message: "User accepted." });
  }

  return res.status(400).send({ message: "Something went wrong!" });
}

export const grantHost = async (req: Request, res: Response) => {
  
  const { roomId, userId }: { roomId: string, userId: string } = req.body;
  const requestingUserId = req.headers[X_USER_ID] as string;

  const isUserAccepted = await roomManager.grantHost(roomId, userId, requestingUserId);
  
  if (isUserAccepted) {
    return res.status(201).send({ message: "User accepted." });
  }

  return res.status(400).send({ message: "Something went wrong!" });
}


export const leaveRoom = async (req: Request, res: Response) => {
  
  const { roomId }: { roomId: string, userId: string } = req.body;
  const requestingUserId = req.headers[X_USER_ID] as string;

  const userLeft = await roomManager.leaveRoom(roomId, requestingUserId);
  
  if (userLeft) {
    return res.status(201).send({ message: "User accepted." });
  }

  return res.status(400).send({ message: "Something went wrong!" });
}