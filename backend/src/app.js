import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
//import materiaRoutes from './routes/materiaRoutes.js';
//import relacionamentoRoutes from './routes/relacionamentoRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);

// Middleware de erros SEMPRE por último
app.use(errorHandler);

export default app;