import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

class PedidoRepository {
  async findComprasByUsuarioId(usuarioId: number) {
    return prisma.pedido.findMany({
      where: { usuario_id: usuarioId },
      include: {
        pedido_juego: {
          select: {
            cantidad: true,
            precio_unitario: true,
            juego: { select: { id: true, titulo: true, imagen_url: true } },
          },
        },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async createPedido(usuarioId: number, juegos: { juegoId: number; cantidad: number }[]) {
    let total: number = 0;
    const juegosConPrecio = [];

    for (const item of juegos) {
      const juego = await prisma.juego.findUnique({ where: { id: item.juegoId } });
      if (!juego) throw new Error(`El juego con id ${item.juegoId} no existe`);

      const precioUnitario = Number(juego.precio);
      total += precioUnitario * item.cantidad;

      juegosConPrecio.push({
        juego_id: item.juegoId,
        cantidad: item.cantidad,
        precio_unitario: precioUnitario,
      });
    }

    const pedido = await prisma.pedido.create({
      data: {
        usuario_id: usuarioId,
        total,
        pedido_juego: {
          create: juegosConPrecio,
        },
      },
      include: {
        pedido_juego: { include: { juego: true } },
      },
    });

    return pedido;
  }
}

export const pedidoRepository = new PedidoRepository();
