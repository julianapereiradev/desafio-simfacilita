import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputComment } from '../protocols';
import { commentsService } from '../services/comments-services';

export async function createComment(req: Request, res: Response) {
  const { userId, postId, comment } = req.body as InputComment;

  const newComment = await commentsService.createComment(userId, postId, comment);
  return res.status(httpStatus.CREATED).send(newComment);
}

export const commentsController = {
  createComment,
};
