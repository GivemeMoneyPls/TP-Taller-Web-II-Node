import { CarritoRepository } from "../repositories/carrito.repository.js";

const carritoRepository = new CarritoRepository();

export class CarritoService {
  async agregarAlCarrito(usuarioId: number, juegoId: number) {
    const existente = await carritoRepository.findItem(usuarioId, juegoId);

    if (existente) {
      const nuevaCantidad = existente.cantidad + 1;
      return await carritoRepository.updateCantidad(usuarioId, juegoId, nuevaCantidad);
    }

    return await carritoRepository.createItem(usuarioId, juegoId);
  }
}
