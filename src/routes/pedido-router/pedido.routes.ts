import { Router } from 'express';

import { getMisCompras } from '../../controllers/pedido.controller.js'; 

const router = Router();

router.get('/usuario/:usuarioId', getMisCompras); 

export default router;