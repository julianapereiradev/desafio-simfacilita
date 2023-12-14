import { InputSession, InputUsers, SessionResponse, Users } from '../protocols';
import { usersRepository } from '../repositories/users-repositories';
import bcrypt from "bcrypt"
import { emailAlreadyExistsError, emailNotExistsError, invalidPasswordError } from '../errors/errors';

async function createUserRegister(name: string, lastName: string, birthday: Date, phone: string, email: string, password: string, profileUrl: string): Promise<Users> {
  const userData: InputUsers = { name, lastName, birthday, phone, email, password, profileUrl };
  
  const emailRegistered = await usersRepository.findUsers(userData.email)
  
  if (emailRegistered) throw emailAlreadyExistsError("This email already exists!");

  const userRegister = await usersRepository.createUserRegister(userData);
  
  return userRegister;
}

async function createUserLogin(email: string, password: string): Promise<SessionResponse> {
  const loginData: InputSession = { email, password };

  const emailRegistered = await usersRepository.findUsers(loginData.email)
  if (!emailRegistered) throw emailNotExistsError("This email not exist.");

  const correctPassword = bcrypt.compareSync(password, emailRegistered.password)
  if (!correctPassword) throw invalidPasswordError("This password is not correct.");

  const userLogin = await usersRepository.createUserLogin(emailRegistered.id);
  
  return userLogin;
}


export const usersService = {
  createUserRegister,
  createUserLogin
};
