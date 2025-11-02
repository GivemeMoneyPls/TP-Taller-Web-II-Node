import {Router} from 'express';
import { PlataformaController } from '../../controllers/plataforma.controller.js';


const plataformaRouter = Router();
const plataformaController = new PlataformaController();

plataformaRouter.get('/', plataformaController.getPlataformas.bind(plataformaController));

export default plataformaRouter;