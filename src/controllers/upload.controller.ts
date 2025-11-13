import { type Request, type Response } from 'express';

export class UploadController {
    
  public uploadImage = async (req: Request, res: Response) => {
    console.log('Archivo recibido:', req.file);
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    return res.status(200).json(imageUrl);
  }
}