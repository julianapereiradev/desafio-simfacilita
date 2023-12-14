import { Router } from 'express';
import { followsController } from '../controllers/follows-controllers';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { followsSchema } from '../schemas/follows-schemas';

const followsRouter = Router();

followsRouter.post('/follow/:id', validateSchemaMiddleware(followsSchema), followsController.followOrUnfollowUser);
followsRouter.get('/followers/:id', followsController.getFollowers); //Obter seguidores de um usuário
followsRouter.get('/following/:id', followsController.getFollowing); //Obter usuários que um usuário está seguindo

export { followsRouter };
