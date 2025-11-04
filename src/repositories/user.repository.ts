import { prisma } from "../prisma.js";
import { type usuario } from "@prisma/client";

export class UserRepository {

  async findUserByEmail(email: string): Promise<usuario | null> {
    return await prisma.usuario.findUnique({
      where: { email: email }
    });
  }

  async createUser(data: any): Promise<usuario> {
    return await prisma.usuario.create({
      data: data
    });
  }
}