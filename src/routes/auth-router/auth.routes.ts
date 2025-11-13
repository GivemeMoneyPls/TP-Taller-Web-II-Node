import { Router } from 'express';
import { UserController } from '../../controllers/user.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';

const authRouter = Router();
const userController = new UserController();

authRouter.post('/signup', userController.signup);
authRouter.post('/signin', userController.signin);
authRouter.put('/update', verifyToken, userController.updateProfile);

export default authRouter;