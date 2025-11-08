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
}

export const pedidoService = new PedidoService();