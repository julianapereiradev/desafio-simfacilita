import { Router } from 'express';
import { usersController } from '../controllers/users-controllers';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { usersSchema } from '../schemas/users-schemas';
import { sessionsSchema } from '../schemas/sessions-schemas';
import { usersUpdateSchema } from '../schemas/users-update-schemas';
import { passwordUpdateSchema } from '../schemas/password-update-schemas';
import { tokenValidation } from '../middlewares/token-validation';

const usersRouter = Router();

usersRouter.post('/signup', validateSchemaMiddleware(usersSchema), usersController.userRegister);
usersRouter.post('/signin', validateSchemaMiddleware(sessionsSchema), usersController.userLogin);
usersRouter.get('/user', tokenValidation, usersController.getProfileById);
usersRouter.put('/user', tokenValidation, validateSchemaMiddleware(usersUpdateSchema), usersController.updateProfileId);
usersRouter.delete('/user', tokenValidation, usersController.deleteProfileId);
usersRouter.get('/users', tokenValidation, usersController.getAllUsers);
usersRouter.put('/user/update-password', tokenValidation, validateSchemaMiddleware(passwordUpdateSchema), usersController.updatePassword);
usersRouter.get('/user/:id', tokenValidation, usersController.getOtherUsersProfileById);
export { usersRouter };
