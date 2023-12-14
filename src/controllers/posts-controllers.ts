import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputPosts } from '../protocols';
import { postsService } from '../services/posts-services';

export async function createPosts(req: Request, res: Response) {
  const { userId, description } = req.body as InputPosts;

  const result = await postsService.createPost(userId, description);
  console.log('result em createpost controller', result)
  return res.status(httpStatus.CREATED).send(result);
}

export const postsController = {
  createPosts,
};