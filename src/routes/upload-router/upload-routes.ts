import {Router} from 'express';
import { UploadController } from '../../controllers/upload.controller.js';
import { uploadMiddleware } from '../../middlewares/multer.js';

const uploadRouter = Router();
const uploadController = new UploadController();

uploadRouter.post('/', uploadMiddleware.single('imagen_url'), uploadController.uploadImage.bind(uploadController));

export default uploadRouter;