import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { commentsController } from '../controllers/comments-controllers';
import { commentsSchema } from '../schemas/comments-schemas';

const commentsRouter = Router();

commentsRouter.post('/comments', validateSchemaMiddleware(commentsSchema), commentsController.createComment);

export { commentsRouter };
