import { GeneroRepository } from "../repositories/genero.repository.js";

export class GeneroService{

    constructor(private generoRepository:GeneroRepository){}

    async getGeneros(){
        return await this.generoRepository.getGeneros();
    }
}