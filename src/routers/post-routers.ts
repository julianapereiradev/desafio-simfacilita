import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { tokenValidation } from '../middlewares/token-validation';
import { postsSchema } from '../schemas/posts-schemas';
import { postsController } from '../controllers/posts-controllers';

const postsRouter = Router();

postsRouter.post('/home', validateSchemaMiddleware(postsSchema), postsController.createPosts);

export { postsRouter };
