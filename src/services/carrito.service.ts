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
  async obtenerCarrito(usuarioId: number) {
    const carrito = await carritoRepository.getCarritoByUsuario(usuarioId);
    return carrito;
  }
  async eliminarDelCarrito(usuarioId: number, juegoId: number) {
  const existente = await carritoRepository.findItem(usuarioId, juegoId);

  if (!existente) {
    throw new Error("El producto no está en el carrito");
  }

  if (existente.cantidad > 1) {
    const nuevaCantidad = existente.cantidad - 1;
    return await carritoRepository.updateCantidad(usuarioId, juegoId, nuevaCantidad);
  } else {
    return await carritoRepository.deleteItem(usuarioId, juegoId);
  }
}
}
