import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { ConnectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.listen(PORT, () => {
    ConnectDB()
    console.log(`server is running on http://localhost:${PORT}`);
})