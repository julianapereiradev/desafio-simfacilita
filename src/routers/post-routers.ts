import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { tokenValidation } from '../middlewares/token-validation';
import { postsSchema } from '../schemas/posts-schemas';
import { postsController } from '../controllers/posts-controllers';

const postsRouter = Router();

postsRouter.post('/timeline', validateSchemaMiddleware(postsSchema), postsController.createPosts);
postsRouter.get('/timeline', postsController.getAllPosts);
postsRouter.get('/timeline/:id', postsController.getAllPostsById);

export { postsRouter };
