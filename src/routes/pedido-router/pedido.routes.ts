import { Router } from 'express';
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { getMisCompras } from '../../controllers/pedido.controller.js'; 

const router = Router();

router.get('/usuario/:usuarioId', verifyToken, getMisCompras); 

export default router;