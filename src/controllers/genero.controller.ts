import {type Request, type Response } from "express";
import { GeneroRepository } from "../repositories/genero.repository.js";
import { GeneroService } from "../services/genero.service.js";

const generoRepository = new GeneroRepository();
const generoService = new GeneroService(generoRepository)

export class GeneroController {

    constructor() {}

    public getGeneros = async(req:Request, res:Response) => {

        try {

            const generos = await generoService.getGeneros();

            res.status(200).json(generos);
            
        } catch (error) {
            res.status(500).json({message: "Error al obtener los generos", error});
        }

    }

}