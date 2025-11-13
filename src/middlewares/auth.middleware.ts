import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: any;
}

// 1. VERIFICAR TOKEN
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Falta el token.' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET no definido");

        const verified = jwt.verify(token, secret);
        
        req.user = verified;
        
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido o expirado.' });
    }
};

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user && user.admin === true) {
        next();
    } else {
        res.status(403).json({ message: 'Acceso prohibido. Se requieren permisos de administrador.' });
    }
};