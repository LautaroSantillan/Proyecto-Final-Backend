/* ---------- CONFIG & SERVER ---------- */
import { config } from './config/config.js';
import { createServer } from './server.js';

/* ---------- MÓDULOS ---------- */
import os from 'os';
import cluster from 'cluster';
import { logger } from './utils/logger.js';
import dotenv from 'dotenv';
dotenv.config()

/* ---------- APP ---------- */
const CPUs = os.cpus();
const numCPUs = CPUs.length;
const PORT = process.env.PORT;
const modo = config.modoServer;

/* ---------- CLUSTER ---------- */
if(cluster.isPrimary && modo === 'cluster'){
    logger.info(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    };
    cluster.on('online', (worker, code, signal) =>{
        logger.info(` Worker: ${worker.process.pid} start. Date: ${new Date().toLocaleDateString()}`);
    });
    cluster.on('exit', (worker, code, signal) =>{
        logger.info(` Worker: ${worker.process.pid} died. Date: ${new Date().toLocaleDateString()}`);
    });
} else {
    const app = createServer();
    try {
        const connectedServer = await app.listen(PORT);
        logger.info(`Server is listening in the port http://localhost:${connectedServer.address().port}/ - Date: ${new Date().toLocaleDateString()}`);
    } catch (error) {
        logger.error(`Error en servidor ${error}`);
    }
    process.on('exit', code => {
        logger.error('Salida con código de error: ' + code);
    })
}
