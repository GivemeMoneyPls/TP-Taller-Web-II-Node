import { Router } from "express";
import gameRouter from "./game-router/game.routes.js";
import plataformaRouter from "./plataforma-router/plataforma.routes.js";

export class AppRoutes {

    static get routes():Router {

        const router = Router();

        router.use('/api/game', gameRouter);
        router.use('/api/plataforma', plataformaRouter)

        return router;
    }

}