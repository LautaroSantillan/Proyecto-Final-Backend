/* ---------- MÓDULOS ---------- */ 
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import hbs from 'hbs';
import { config } from './config/config.js';
import { logger } from './utils/logger.js';
import { connectMongoDB } from './config/mongoDB.js';

/* ---------- MÓDULOS SOCKET ---------- */
import { Server as HttpServer } from 'http';
import { Server as IOSocket } from 'socket.io';
import { productos } from './sockets/productos.sockets.js';
import { mensajes } from './sockets/mensajes.sockets.js';
import { carrito } from './sockets/carrito.sockets.js';

/* ---------- MIDDLEWARES ---------- */
import passport from './services/passport.js';
import { loggingExist, loggingNotExist } from './middlewares/loggings.middleware.js';
import compression from 'compression';
import { wrap } from './middlewares/wrapSocket.middleware.js';

/* ---------- ROUTES ---------- */
import routes from './routes/index.routes.js';

/* ---------- CONFIG PATH ---------- */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const absolutePath = join(__dirname, '..');

/* ---------- FUNCIÓN PARA CREAR EL SERVER ---------- */
export const createServer = () => {

    /* ---------- INSTANCIA SERVER ---------- */
    const app = express();
    const httpServer = new HttpServer(app);
    const io = new IOSocket(httpServer);
    connectMongoDB();

    /* ---------- SOCKET.IO ---------- */
    io.on('connection', async socket => {
        logger.info('A user connected');
        productos(socket, io);
        mensajes(socket, io);
        carrito(socket, io );
    })

    /* ---------- CONFIG SERVER---------- */
    app.use(express.static(absolutePath + '/public'));
    app.set('view engine', 'hbs');
    app.set('views', (absolutePath + '/public/views'));
    hbs.registerPartials(absolutePath + '/public/views/partials');
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session(config.session));
    app.use(morgan('dev'));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(compression());

    /* ---------- ROUTES SERVER ---------- */
    app.use(routes);

    /* ---------- LOGGINGS GENERAL Y NO EXISTENTES ---------- */
    app.use(loggingExist);
    app.use('*', loggingNotExist);
    
    /* ---------- SOCKET SESSION ---------- */
    io.use(wrap(session(config.session)));
    /* ---------- ---------- */
    return {
        listen: port => new Promise((resolve, reject) => {
            const connectedServer = httpServer.listen(port, () => {
                resolve(connectedServer);
            })
            connectedServer.on('error', error => {
                reject(error);
            });
        })
    };
};