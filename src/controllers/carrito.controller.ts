import { type Request, type Response } from "express";
import { CarritoService } from "../services/carrito.service.js";

const carritoService = new CarritoService();

export class CarritoController {
  
  async agregarAlCarrito(req: Request, res: Response) {
    try {
      const { usuarioId, juegoId } = req.body;

      if (!usuarioId || !juegoId) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
      }

      const resultado = await carritoService.agregarAlCarrito(usuarioId, juegoId);
      res.status(200).json({
        message: "Juego agregado al carrito con éxito",
        data: resultado,
      });
    } catch (error:any) {
      console.error("Error al agregar al carrito:", error);
      res.status(500).json({
        message: "Error interno al agregar al carrito",
        error: error.message,
      });
    }
  }


  async obtenerCarrito(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;

      if (!usuarioId) {
        return res.status(400).json({ message: "Falta el ID del usuario" });
      }

      const carrito = await carritoService.obtenerCarrito(Number(usuarioId));

      if (!carrito || carrito.length === 0) {
        return res.status(200).json([]); 
      }

      res.status(200).json(carrito);
    } catch (error:any) {
      console.error("Error al obtener el carrito:", error);
      res.status(500).json({
        message: "Error interno al obtener el carrito",
        error: error.message,
      });
    }
  }
  async eliminarDelCarrito(req: Request, res: Response) {
  try {
    const { usuarioId, juegoId } = req.body;

    if (!usuarioId || !juegoId) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const resultado = await carritoService.eliminarDelCarrito(usuarioId, juegoId);

    res.status(200).json({
      message: "Producto actualizado en el carrito",
      data: resultado,
    });
  } catch (error: any) {
    console.error("Error al eliminar del carrito:", error);
    res.status(500).json({
      message: "Error interno al eliminar del carrito",
      error: error.message,
    });
  }
}
  async vaciarCarrito(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;

      if (!usuarioId) {
        return res.status(400).json({ message: "Falta el ID del usuario" });
      }

      await carritoService.vaciarCarrito(Number(usuarioId));

      res.status(200).json({ message: "Carrito vaciado con éxito" });
    } catch (error: any) {
      console.error("Error al vaciar el carrito:", error);
      res.status(500).json({
        message: "Error interno al vaciar el carrito",
        error: error.message,
      });
    }
  }

}
