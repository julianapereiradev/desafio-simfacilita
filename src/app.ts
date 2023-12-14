import "express-async-errors";
import express, { Request, Response, json } from 'express';
import httpStatus from 'http-status';
import 'express-async-errors';
import cors from 'cors';
import { usersRouter } from './routers/users-routers';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';
import { postsRouter } from "./routers/post-routers";
import { commentsRouter } from "./routers/comments-routers";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send("I'm ok!");
  })
  .use('/', usersRouter)
  .use('/', postsRouter)
  .use('/', commentsRouter)
  .use(handleApplicationErrors);

export default app;
