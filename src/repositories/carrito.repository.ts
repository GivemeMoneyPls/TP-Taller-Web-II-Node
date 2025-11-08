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
  async getCarritoByUsuario(usuarioId: number) {
    return await prisma.usuario_juego.findMany({
      where: { usuario_id: usuarioId },
      include: {
        juego: {
          include: {
            plataforma: true,
            juego_genero: {
              include: { genero: true }
            }
          }
        }
      }
    });
  }
  async deleteItem(usuarioId: number, juegoId: number) {
  return await prisma.usuario_juego.delete({
    where: {
      usuario_id_juego_id: { usuario_id: usuarioId, juego_id: juegoId },
    },
  });
}
  async clearCarrito(usuarioId: number) {
    return await prisma.usuario_juego.deleteMany({
      where: { usuario_id: usuarioId },
    });
  }

}
