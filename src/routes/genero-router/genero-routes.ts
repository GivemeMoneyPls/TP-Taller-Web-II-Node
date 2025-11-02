import { Router } from "express";
import { GeneroController } from "../../controllers/genero.controller.js";

const generoRouter = Router();
const generoController = new GeneroController();

generoRouter.get('/', generoController.getGeneros.bind(generoController));

export default generoRouter;