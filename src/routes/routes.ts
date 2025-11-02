import { Router } from "express";
import gameRouter from "./game-router/game.routes.js";
import generoRouter from "./genero-router/genero-routes.js";

export class AppRoutes {

    static get routes():Router {

        const router = Router();

        router.use('/api/game', gameRouter);
        router.use('/api/genero', generoRouter);

        return router;
    }

}