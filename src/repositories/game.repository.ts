import type { GameDTO } from "../models/game.model.js";
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

    async findSimilarGames(generos: string[], excludeId: number) {
        const juegos = await prisma.juego.findMany({
            where: {
                 id: { not: excludeId },juego_genero: {
        some: { genero: { nombre: { in: generos } } }
      }
    },
    include: { 
      plataforma: true,
      juego_genero: { include: { genero: true } }
    }
  });

  
  const juegosOrdenados = juegos
  .map(j => ({
    ...j,
    coincidencias: j.juego_genero.filter(g => generos.includes(g.genero.nombre)).length
  }))
  .sort((a, b) => {
    if (b.coincidencias !== a.coincidencias) return b.coincidencias - a.coincidencias;
    return Math.random() - 0.5; 
  })
  .slice(0, 6);

  return juegosOrdenados;
}

    async updateGame(id: number, juegoAActualizar:GameDTO) {

        return await prisma.juego.update({
            where: { id: id },
            data: {
              titulo: juegoAActualizar.titulo,
              precio: juegoAActualizar.precio,
              descripcion: juegoAActualizar.descripcion,
              imagen_url: juegoAActualizar.imagen_url,
              plataforma_id: juegoAActualizar.plataforma_id,
              fecha_lanzamiento: juegoAActualizar.fecha_lanzamiento,
              juego_genero: {
                deleteMany: {},
                create: juegoAActualizar.generos.map((genId) => ({
                  genero: {
                    connect: { id: genId }
                  }
                }))
              }
            
        }
});
}

async createGame(juegoACrear:GameDTO) {

        return await prisma.juego.create({
            data: {
              titulo: juegoACrear.titulo,
              precio: juegoACrear.precio,
              descripcion: juegoACrear.descripcion,
              imagen_url: juegoACrear.imagen_url,
              plataforma_id: juegoACrear.plataforma_id,
              fecha_lanzamiento: juegoACrear.fecha_lanzamiento,
              juego_genero: {
                create: juegoACrear.generos.map((genId) => ({
                  genero: {
                    connect: { id: genId }
                  }
                }))
              }
            
        }
});
}

    async findAllGames() {
        return await prisma.juego.findMany({
            include: { plataforma: true, 
                juego_genero: { include: { genero: true } } }
        });
    }
}