import express, {type Request, type Response} from 'express';
import { AppRoutes } from './routes/routes.js';
import cors from 'cors';
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsPath = path.resolve(__dirname, '../public/uploads');



app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200', // solo tu frontend Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', express.static(uploadsPath));

app.use(AppRoutes.routes);



// app.get('/', (req: Request, res: Response) => {
//     res.send('watafa');
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});