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
}
