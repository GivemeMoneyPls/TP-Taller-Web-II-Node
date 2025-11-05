import { prisma } from "../prisma.js";

export class PlataformaRepository{

    async getPlataformas(){

        return await prisma.plataforma.findMany({
            orderBy: {id: 'asc'}
        });
    }
}