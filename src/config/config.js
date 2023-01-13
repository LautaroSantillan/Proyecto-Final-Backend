import yargs from 'yargs/yargs';
import { mongoSessions } from './mongoDB.js';
import dotenv from 'dotenv';
dotenv.config();
/*  ---- ARGS ------ */
const args = yargs(process.argv.slice(2))
    .default({
        modo: 'fork',
        puerto: 8080
    })
    .alias({
        m: 'modo',
        p: 'puerto'
    })
    .argv

/*  ---- SESSIONS ----- */
const sessionConfig = {
    secret: process.env.SESSION_SECRET || '123456',
    resave: false,
    saveUninitialized: false,
    rolling: true,                  
    cookie: {
        maxAge: 1000 * 60 * 10                     
    },
    store: mongoSessions
}

/*  ---- EXPORT ---- */
export const config = {
    modoServer : args.modo,
    puerto : args.puerto,
    COOKIES_SECRET: process.env.COOKIES_SECRET || 123456,
    SESSION_SECRET: process.env.SESSION_SECRET || 123456,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "dbpass18",
    MONGO_USER: process.env.MONGO_USER || "Lautaro",
    MONGO_HOST: process.env.MONGO_HOST || "cluster0.xuysz5s.mongodb.net",
    DAO_MENSAJES: process.env.DAO_MENSAJES || 'mongo',
    DAO_PRODUCTOS: process.env.DAO_PRODUCTOS || 'mongo',
    session: sessionConfig
}
