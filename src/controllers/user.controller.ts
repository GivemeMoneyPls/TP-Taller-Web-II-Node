import { type Request, type Response } from "express";
import { UserService } from "../services/user.service.js";


const userService = new UserService();

export class UserController {

  constructor() {}

  async signup(req: Request, res: Response) {
    try {
      const userData = req.body; 

      const newUser = await userService.registerUser(userData);

      res.status(201).json({ message: "Usuario creado con éxito", user: newUser });

    } catch (error: any) {
      res.status(400).json({ message: "Error al registrar usuario", error: error.message });
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const loginData = req.body;

      const loginResult = await userService.loginUser(loginData);

      res.status(200).json(loginResult); 

    } catch (error: any) {
      res.status(401).json({ message: "Credenciales inválidas", error: error.message });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userData = req.body;

      if (!userData.id) {
        return res.status(400).json({ message: "Falta el ID del usuario" });
      }

      const result = await userService.updateUser(userData);

      res.status(200).json(result);

    } catch (error: any) {
      console.error("Error en updateProfile:", error);
      res.status(500).json({ 
        message: "Error al actualizar el perfil", 
        error: error.message 
      });
    }
  } 
  
  async recuperarPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ mensaje: "Debes ingresar un correo" });
      }

      await userService.recuperarPassword(email);

      return res.status(200).json({
        mensaje: "Token generado. Revisá el archivo recuperar.txt"
      });

    } catch (error: any) {
      return res.status(400).json({ mensaje: error.message });
    }
  }

  async confirmarNuevaContrasena(req: Request, res: Response) {
    try {
      const { token, nuevaContrasena } = req.body;

      if (!token || !nuevaContrasena) {
        return res.status(400).json({ mensaje: "Faltan datos" });
      }

      await userService.confirmarNuevaContrasena(token, nuevaContrasena);

      return res.status(200).json({
        mensaje: "Contraseña actualizada con éxito"
      });

    } catch (error: any) {
      return res.status(400).json({ mensaje: error.message });
    }
  }

}
