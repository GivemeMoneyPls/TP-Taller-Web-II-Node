import { Router } from 'express';
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { getMisCompras, finalizarCompra } from '../../controllers/pedido.controller.js';

const router = Router();

router.get('/usuario/:usuarioId', verifyToken, getMisCompras);
router.post('/finalizar', verifyToken, finalizarCompra);

export default router;