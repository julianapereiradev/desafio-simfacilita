import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { followsService } from '../services/follows-services';

export async function getFollowers(req: Request, res: Response) {
  const userId = Number(req.params.id);
  const result = await followsService.getFollowers(userId);
  return res.status(httpStatus.OK).send(result);
}

export async function getFollowing(req: Request, res: Response) {
  const userId = Number(req.params.id);
  const result = await followsService.getFollowing(userId);
  return res.status(httpStatus.OK).send(result);
}

export async function followOrUnfollowUser(req: Request, res: Response) {
  const followedId = Number(req.params.id);
  const followerId = Number(req.body.followerId);

  const result = await followsService.followOrUnfollowUser(followerId, followedId);

  return res.status(httpStatus.OK).send(result);
}


export const followsController = {
  getFollowers,
  getFollowing,
  followOrUnfollowUser
};
