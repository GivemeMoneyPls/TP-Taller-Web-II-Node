// src/services/pedido.service.ts

import { pedidoRepository } from '../repositories/pedido.repository.js'; // Importa el repositorio

class PedidoService {

    async getComprasByUsuario(usuarioId: number) {
        
        const pedidos = await pedidoRepository.findComprasByUsuarioId(usuarioId);

        if (pedidos.length === 0) {
            return [];
        }

        return pedidos;
    }

     async finalizarCompra(usuarioId: number, juegos: { juegoId: number; cantidad: number }[]) {
    const pedido = await pedidoRepository.createPedido(usuarioId, juegos);
    return pedido;
  }

}



export const pedidoService = new PedidoService();