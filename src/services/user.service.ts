import { UserRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();

export class UserService {

  async registerUser(userData: any) {
    
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('El email ya está en uso');
    }

    if (userData.contraseña.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.contraseña, salt);

    const dataToSave = {
        email: userData.email,
        nombre: userData.nombre,
        apellido: userData.apellido,
        direccion: userData.direccion,
        contrase_a: hashedPassword
    };

    return await userRepository.createUser(dataToSave);
  }

  async loginUser(loginData: any) {

    const user = await userRepository.findUserByEmail(loginData.email);
    if (!user) {
      throw new Error('Email o contraseña incorrectos');
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.contraseña,
      user.contrase_a
    );

    if (!isPasswordValid) {
      throw new Error('Email o contraseña incorrectos');
    }

    
    try {
        if (!process.env.JWT_SECRET) {
          throw new Error('La clave secreta JWT no está definida en .env');
        }
   
        const payload = { 
          id: user.id, 
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          direccion: user.direccion
        };
      
        const token = jwt.sign(
          payload, 
          process.env.JWT_SECRET, 
          { expiresIn: '8h' } 
        );

        return { token };
      
      } catch (error) {
        console.error("Error al firmar el token:", error);
        throw new Error('Error interno al generar la sesión');
      }
  }

  async updateUser(userData : any) {

    const currentUser = await userRepository.findUserById(userData.id); 

    if (!currentUser) {
        throw new Error('Usuario no encontrado');
    }
  
      const dataToUpdate: any = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      direccion: userData.direccion
    };
 
    if (userData.newPassword && userData.newPassword.trim() !== '') {

      if (!userData.currentPassword) {
        throw new Error('Para cambiar la contraseña, debes ingresar tu contraseña actual.');
      }

      const isPasswordCorrect = await bcrypt.compare(userData.currentPassword, currentUser.contrase_a);
      if (!isPasswordCorrect) {
        throw new Error('La contraseña actual es incorrecta.');
      }

      if (userData.newPassword.length < 8) {
        throw new Error('La nueva contraseña debe tener al menos 8 caracteres');
      }

      const isSamePassword = await bcrypt.compare(userData.newPassword, currentUser.contrase_a);
      if (isSamePassword) {
        throw new Error('La nueva contraseña no puede ser igual a la actual.');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.newPassword, salt);
      dataToUpdate.contrase_a = hashedPassword;
    }

    const updatedUser = await userRepository.updateUser(userData.id, dataToUpdate);

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no definido');
    }

    const payload = {
      id: updatedUser.id,
      email: updatedUser.email, 
      nombre: updatedUser.nombre,
      apellido: updatedUser.apellido,
      direccion: updatedUser.direccion
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    return { token };
  }

}