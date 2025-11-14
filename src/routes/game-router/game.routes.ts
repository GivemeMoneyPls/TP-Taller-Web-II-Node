import {Router} from 'express';
import { GameController } from '../../controllers/game.controller.js';
import { verifyToken, verifyAdmin } from '../../middlewares/auth.middleware.js';

const gameRouter = Router();
const gameController = new GameController();

gameRouter.get('/', gameController.getGames.bind(gameController));
gameRouter.get('/:id', gameController.getGame.bind(gameController));

gameRouter.get('/similares/:id', gameController.getSimilarGames.bind(gameController));

gameRouter.put('/:id', verifyToken, verifyAdmin, gameController.updateGame.bind(gameController));
gameRouter.post('/', verifyToken, verifyAdmin, gameController.createGame.bind(gameController));
gameRouter.delete('/:id', verifyToken, verifyAdmin, gameController.deleteGame.bind(gameController));


export default gameRouter;