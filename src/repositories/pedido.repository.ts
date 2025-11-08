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
                        juego: {
                            select: {
                                id: true,
                                titulo: true,
                                imagen_url: true, 
                            },
                        },
                    },
                },
            },
            orderBy: { fecha: 'desc' },
        });
    }
}

export const pedidoRepository = new PedidoRepository();