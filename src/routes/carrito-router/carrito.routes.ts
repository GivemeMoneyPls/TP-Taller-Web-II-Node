import { Router } from 'express';
import { CarritoController } from '../../controllers/carrito.controller.js';

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.post('/agregar', carritoController.agregarAlCarrito);
carritoRouter.get('/:usuarioId', carritoController.obtenerCarrito);
export default carritoRouter;