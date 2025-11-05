import { prisma } from "../prisma.js";

export class CarritoRepository {
  async findItem(usuarioId: number, juegoId: number) {
    return await prisma.usuario_juego.findFirst({
      where: { usuario_id: usuarioId, juego_id: juegoId },
    });
  }

  async updateCantidad(usuarioId: number, juegoId: number, cantidad: number) {
    return await prisma.usuario_juego.update({
      where: {
        usuario_id_juego_id: { usuario_id: usuarioId, juego_id: juegoId },
      },
      data: { cantidad },
    });
  }

  async createItem(usuarioId: number, juegoId: number) {
    return await prisma.usuario_juego.create({
      data: {
        usuario_id: usuarioId,
        juego_id: juegoId,
        cantidad: 1,
      },
    });
  }
}
