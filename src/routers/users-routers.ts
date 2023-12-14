import { Router } from 'express';
import { usersController } from '../controllers/users-controllers';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { usersSchema } from '../schemas/users-schemas';
import { sessionsSchema } from '../schemas/sessions-schemas';

const usersRouter = Router();

usersRouter.post('/signup', validateSchemaMiddleware(usersSchema), usersController.userRegister);
usersRouter.post('/signin', validateSchemaMiddleware(sessionsSchema), usersController.userLogin);

export { usersRouter };
