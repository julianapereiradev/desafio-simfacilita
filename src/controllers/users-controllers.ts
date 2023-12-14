import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputSession, InputUsers } from '../protocols';
import { usersService } from '../services/users-services';

export async function userRegister(req: Request, res: Response) {
  const { name, lastName, birthday, phone, email, password, profileUrl } = req.body as InputUsers;
  
  const result = await usersService.createUserRegister(name, lastName, birthday, phone, email, password, profileUrl);
  
  return res.status(httpStatus.CREATED).send(result);
}

export async function userLogin(req: Request, res: Response) {
  const { email, password } = req.body as InputSession;
  
  const result = await usersService.createUserLogin(email, password);
  
  return res.status(httpStatus.CREATED).send(result);
}

export async function getProfileById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const profile = await usersService.getProfileById(id);
  res.status(httpStatus.OK).send(profile);
}

export async function updateProfileId(req: Request, res: Response) {
  const { name, lastName, birthday, phone, email, password, profileUrl } = req.body as InputUsers;
  const id = Number(req.params.id);

  const result = await usersService.updateUserProfile(id, name, lastName, birthday, phone, email, password, profileUrl);
  
  return res.status(httpStatus.OK).send(result);
}

export async function getAllUsers(_req: Request, res: Response) {
  const result = await usersService.findAllUsers();
  return res.status(httpStatus.OK).send(result);
}

export async function deleteProfileId(req: Request, res: Response) {
  const id = Number(req.params.id);
  console.log('idd', id)
  const result = await usersService.deleteUserProfile(id);
  console.log('resull de delete controller', result)
  return res.status(httpStatus.OK).send(result);
}


export const usersController = {
  userRegister,
  userLogin,
  getProfileById,
  updateProfileId,
  getAllUsers,
  deleteProfileId
};
