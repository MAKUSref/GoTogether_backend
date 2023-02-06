import { Request, Response } from "express";
import * as userMenagers from '../managers/User';

export const createUser = async (req: Request, res: Response) => {
  const { name, login, password } = req.body;

  const createUserSuccess = await userMenagers.createUser(name, login, password);

  if (createUserSuccess) {
    return res.status(201).json({ message: "User created." });
  }

  return res.status(400).json({ message: "User not created" });
}

export const readUser = async (req: Request, res: Response) => {
  const user = await userMenagers.getUsers();

  if (user !== undefined && user !== null) {
    return res.status(200).json({ user });
  }

  return res.status(404).json({ message: "Users not found" });
}

export const readSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userMenagers.getUser(userId);

  if (user.length !== 0) {
    return res.status(200).json({ user });
  }

  return res.status(404).json({ user, message: "Users not found" });
}

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const userDeleteSuccess = await userMenagers.deleteUser(userId);

  if (userDeleteSuccess) {
    return res.status(200).json({ message: "User deleted." });
  }

  return res.status(404).json({ message: "User not found." });
}

export const loginUser = async (req: Request, res: Response) => {
  const { login, password }: {login: string, password: string} = req.body;

  console.log('logging');
  

  const user = await userMenagers.loginUser(login, password);

  if (user) {
    return res.status(200).json({ user, message: "Login successfull" });
  }

  return res.status(400).json({ message: "Bad request." });
}
