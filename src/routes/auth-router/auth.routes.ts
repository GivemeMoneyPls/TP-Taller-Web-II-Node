import { Router } from 'express';
import { UserController } from '../../controllers/user.controller.js';

const authRouter = Router();
const userController = new UserController();

authRouter.post('/signup', userController.signup);
authRouter.post('/signin', userController.signin);

export default authRouter;