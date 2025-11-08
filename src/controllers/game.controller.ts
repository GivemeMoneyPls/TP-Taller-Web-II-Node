import {type Request, type Response } from "express";
import { GameService } from "../services/game.service.js";
import { GameRepository } from "../repositories/game.repository.js";
import type { GameDTO } from "../models/game.model.js";

const gameRepository = new GameRepository();
const gameService = new GameService(gameRepository);


export class GameController {

    constructor() {}

    public getGames = async(req:Request, res:Response) => {

        try {

            const games = await gameService.getGames();

            res.status(200).json(games);
            
        } catch (error) {
            res.status(500).json({message: "Error al obtener los juegos", error});
        }

    }

     public getGame = async(req:Request, res:Response) => {

        try {

            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({message: "ID invalido"});
            }

            const game = await gameService.getGameById(id);

            if (!game) {
                return res.status(404).json({message: "Juego no encontrado"});
            }

            res.status(200).json(game);
            
        } catch (error) {
            res.status(500).json({message: "No se pudo obtener el juego", error});
        }

    }

    public getSimilarGames = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id); 
        const generos = (req.query.generos as string || "").split(',');
        if (isNaN(id) || !generos.length) {
            return res.status(400).json({message: "Parámetros inválidos"});
        }
        const games = await gameService.getSimilarGames(generos, id);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({message: "Error al obtener juegos similares", error});
    }
}

public updateGame = async(req:Request, res:Response) => {

      const id = Number(req.params.id);
      const juegoAActualizar:GameDTO = req.body;

      console.log(juegoAActualizar);

        if (isNaN(id)) {
            return res.status(400).json({message: "ID invalido"});
        }

        try {
            const gameUpdated = await gameService.updateGame(id, juegoAActualizar);

            res.status(200).json(gameUpdated);
            
        } catch (error) {
            res.status(500).json({message: "No se pudo actualizar el juego", error});
        }

    }

}