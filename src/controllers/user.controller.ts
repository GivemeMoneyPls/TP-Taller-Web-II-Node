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
}