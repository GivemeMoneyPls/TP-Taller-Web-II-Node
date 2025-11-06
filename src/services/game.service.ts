import { GameRepository } from "../repositories/game.repository.js";

export class GameService {

    constructor(private gameRepository:GameRepository) {}

    async getGames() {
        
    return await this.gameRepository.findAllGames();

    }

    async getGameById(id: number) {

        return await this.gameRepository.findGameById(id);

    }

    async getSimilarGames(generos: string[], excludeId: number) {
    return await this.gameRepository.findSimilarGames(generos, excludeId);
}

}