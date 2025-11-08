import { prisma } from "../prisma.js";

interface FiltrosJuego {
    precioMin?: number;
    precioMax?: number;
    plataformaId?: number;
    generoIds?: number[];
}

export class GameRepository {

    async getGames(filtros?: FiltrosJuego) {
        
        if (!filtros) {
            return await this.findAllGames(); 
        }
        
        const { precioMin, precioMax, plataformaId, generoIds } = filtros;
        
        // Objeto 'where' para la consulta de Prisma
        const where: any = {};
        
        // 1. Filtro por Rango de Precios
        if (precioMin !== undefined || precioMax !== undefined) {
            where.precio = {
                ...(precioMin !== undefined && { gte: precioMin }),
                ...(precioMax !== undefined && { lte: precioMax }),
            };
        }

        // 2. Filtro por Plataforma
        if (plataformaId !== undefined) {
            where.plataforma = { // Asumiendo que la relación es 'plataforma' y no 'plataformas'
                id: plataformaId,
            };
        }
        
        // 3. Filtro por Géneros (uso de juego_genero)
        if (generoIds && generoIds.length > 0) {
            where.juego_genero = { 
                some: {
                    genero_id: {
                        in: generoIds,
                    },
                },
            };
        }

        return await prisma.juego.findMany({
            where: where,
            include: { 
                plataforma: true, 
                juego_genero: { include: { genero: true } } 
            }, 
        });
    }

    async findGameById(id: number) {
        return await prisma.juego.findUnique({
            include: { plataforma: true, 
                juego_genero: { include: { genero: true } } },
            where: { id : id }
        });
    }

    async findAllGames() {
        return await prisma.juego.findMany({
            include: { plataforma: true, 
                juego_genero: { include: { genero: true } } }
        });
    }

}