import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { commentsController } from '../controllers/comments-controllers';
import { commentsSchema } from '../schemas/comments-schemas';
import { tokenValidation } from '../middlewares/token-validation';

const commentsRouter = Router();

commentsRouter.post('/comments', tokenValidation, validateSchemaMiddleware(commentsSchema), commentsController.createComment);

export { commentsRouter };
