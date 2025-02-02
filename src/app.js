import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import tasksRouter from './routes/tasks.routes.js'


const app = express();

app.use(morgan('dev'));

app.use(express.json());        // se hace para que nuestro backend pueda interpretar json


app.use(cookieParser());




app.use('/api',authRoutes);
app.use('/api', tasksRouter)


export default app;