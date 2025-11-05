import type { PlataformaRepository } from "../repositories/plataforma.repository.js";

export class PlataformaService{

    constructor(private plataformaRepository:PlataformaRepository) {}

    async getPlataformas(){
        return await this.plataformaRepository.getPlataformas();
    }
}