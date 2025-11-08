import { Router } from "express";
import gameRouter from "./game-router/game.routes.js";
import authRouter from "./auth-router/auth.routes.js";
import plataformaRouter from "./plataforma-router/plataforma.routes.js";
import generoRouter from "./genero-router/genero-routes.js";
import carritoRoutes from './carrito-router/carrito.routes.js';
import pedidoRoutes from './pedido-router/pedido.routes.js';


export class AppRoutes {

    static get routes():Router {

        const router = Router();

        router.use('/api/game', gameRouter);
        router.use('/api/auth', authRouter);
        router.use('/api/plataforma', plataformaRouter)
        router.use('/api/genero', generoRouter);
        router.use('/api/carrito', carritoRoutes);
        router.use('/api/pedidos', pedidoRoutes);

        return router;
    }

}