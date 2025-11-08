import { prisma } from "../prisma.js";

export class GameRepository {

    async findAllGames() {
        return await prisma.juego.findMany({
            include: { plataforma: true, 
                juego_genero: { include: { genero: true } } }
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

}