import { Router } from 'express';
import { CarritoController } from '../../controllers/carrito.controller.js';

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.post('/agregar', carritoController.agregarAlCarrito);

export default carritoRouter;