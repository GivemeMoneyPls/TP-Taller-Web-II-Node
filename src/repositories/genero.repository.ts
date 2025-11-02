import { prisma } from "../prisma.js";


export class GeneroRepository {

    async getGeneros(){
        return await prisma.genero.findMany();
    }
}