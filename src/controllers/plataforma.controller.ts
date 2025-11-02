import {type Request, type Response} from "express";
import { PlataformaRepository } from "../repositories/plataforma.repository.js";
import { PlataformaService } from "../services/plataforma.service.js";

const plataformaRepository = new PlataformaRepository();
const plataformaService = new PlataformaService(plataformaRepository);

export class PlataformaController{


    public getPlataformas = async(req:Request, res:Response)  => {

        try {
            
            const plataformas = await plataformaService.getPlataformas();

            res.status(200).json(plataformas);
            
        } catch (error) {
            
            res.status(500).json({message: "Error al obtener las plataformas", error})
        }
    }

}