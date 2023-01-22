import { mensajesModel } from '../models/mensajes.model.js';
import { ContenedorMensajesMongo } from './mensajes/contenedorMensajesMongo.js';
/* ----- -----*/
export class MensajesFactory {
    static get(tipo){
        switch (tipo) {
            case 'mongo':
                return new ContenedorMensajesMongo(mensajesModel);
            default:
                return new ContenedorMensajesMongo(mensajesModel);
        }
    }
}