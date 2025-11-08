import { GameRepository } from "../repositories/game.repository.js";

interface FiltrosJuego {
    precioMin?: number;
    precioMax?: number;
    plataformaId?: number;
    generoIds?: number[];
}

export class GameService {

    constructor(private gameRepository:GameRepository) {}

    async getGames(filtros?: FiltrosJuego) { 
        
        return await this.gameRepository.getGames(filtros || {}); 
    }

    async getGameById(id: number) {

        return await this.gameRepository.findGameById(id);

    }


}