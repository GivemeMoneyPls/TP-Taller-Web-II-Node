import { Router } from 'express';
import { CarritoController } from '../../controllers/carrito.controller.js';

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.post('/agregar', carritoController.agregarAlCarrito);
carritoRouter.get('/:usuarioId', carritoController.obtenerCarrito);
carritoRouter.post('/eliminar', carritoController.eliminarDelCarrito);
carritoRouter.delete("/vaciar/:usuarioId", carritoController.vaciarCarrito.bind(carritoController));
export default carritoRouter;