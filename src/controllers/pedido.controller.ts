import type { Request, Response } from 'express';
import { pedidoService } from '../services/pedido.service.js'; 

const getMisCompras = async (req: Request, res: Response) => {
    const usuarioId = Number(req.params.usuarioId); 

    if (isNaN(usuarioId)) {
        return res.status(400).json({ message: 'ID de usuario inválido.' });
    }

    try {
       
        const pedidos = await pedidoService.getComprasByUsuario(usuarioId);
        
       
        res.status(200).json(pedidos);

    } catch (error) {
        console.error('Error al obtener las compras:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const finalizarCompra = async (req: Request, res: Response) => {
  const { usuarioId, juegos } = req.body;

  if (!usuarioId || !Array.isArray(juegos) || juegos.length === 0) {
    return res.status(400).json({ message: 'Datos inválidos para finalizar la compra.' });
  }

  try {
    const pedido = await pedidoService.finalizarCompra(usuarioId, juegos);
    res.status(201).json(pedido);
  } catch (error) {
    console.error('Error al finalizar la compra:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export { getMisCompras, finalizarCompra };