import { Router } from 'express';
import { CarritoController } from '../../controllers/carrito.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.post('/agregar', verifyToken, carritoController.agregarAlCarrito);
carritoRouter.get('/:usuarioId', verifyToken, carritoController.obtenerCarrito);
carritoRouter.post('/eliminar', verifyToken, carritoController.eliminarDelCarrito);
carritoRouter.delete("/vaciar/:usuarioId", verifyToken, carritoController.vaciarCarrito.bind(carritoController));
export default carritoRouter;