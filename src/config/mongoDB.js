import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';
dotenv.config();
/* --------- VARIABLES -------- */
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "dbpass18";
const MONGO_USER = process.env.MONGO_USER || "Lautaro";
const MONGO_HOST = process.env.MONGO_HOST || "cluster0.xuysz5s.mongodb.net";
const URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`;
/*  ---- MONGO SESSIONS ---- */
const mongoConfig = {
    useNewUrlparser: true,
    useUnifiedTopology: true
};
// 
export const mongoSessions = MongoStore.create({
    mongoUrl: URL,
    mongoOptions: mongoConfig
});
/*  ---- CONNECTION ---- */
export const connectMongoDB = async () =>{
    try {
        const url = URL;
        mongoose.set('strictQuery', true);
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info(`MongoDB connected - URL:${url}`);
    } catch (error) {
        logger.error('Error MongoDB', error);
    }
};
