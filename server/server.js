import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { ConnectDB } from './config/db.js';
import userRouter from './router/user.router.js'
import introRouter from './router/intro.router.js';
import aboutRouter from './router/about.router.js';
import skillRouter from './router/skill.router.js';

const app = express();
const PORT = process.env.PORT || 5001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
))
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/intro', introRouter);
app.use('/api/v1/about', aboutRouter);
app.use('/api/v1/skill', skillRouter);

app.listen(PORT, () => {
    ConnectDB()
    console.log(`server is running on http://localhost:${PORT}`);
})