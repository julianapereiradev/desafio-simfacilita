import { Router } from 'express';
import { followsController } from '../controllers/follows-controllers';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { followsSchema } from '../schemas/follows-schemas';
import { tokenValidation } from '../middlewares/token-validation';

const followsRouter = Router();

followsRouter.post('/follow/:id', tokenValidation, validateSchemaMiddleware(followsSchema), followsController.followOrUnfollowUser);
followsRouter.get('/followers/:id', tokenValidation, followsController.getFollowers);
followsRouter.get('/following/:id', tokenValidation, followsController.getFollowing);

export { followsRouter };
