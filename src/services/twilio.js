import { logger } from "../utils/logger.js";
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config()
/* --------- No me toma las credenciales del .env --------- */
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const PHONE_ADMIN = process.env.PHONE_ADMIN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;
/* --------- --------- */
const accountSid = 'AC4aebb50dbc7a7c8fd227c88e35e93605' || TWILIO_ACCOUNT_SID;
const authToken = '8c96461ea0082e271848ad344bde51af' || TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
/* --------- --------- */
export const sendNewOrder = async (order, user) => {
    try {
        const option = {
            from: '+15304445602' || TWILIO_PHONE_NUMBER,
            to: 'whatsapp:+5491165799996' || PHONE_ADMIN,
            body: `Se ha realizado un nuevo pedido por el usuario ${user.name} con el email: ${user.userEmail} y el teléfono: ${user.phone} con el siguiente detalle: ${order}`,
        }
        logger.info('Mensaje de orden enviado');
        await client.messages.create(option);
    } catch (error) {
        logger.error('Error en sendNewOrder', error);
    }
};
/* --------- --------- */
export const sendWhatsApp = async (order, total, user) => {
    try {
        const option = {
            from: 'whatsapp:+14155238886' || TWILIO_WHATSAPP_NUMBER,
            to: 'whatsapp:+5491165799996' || `whatsapp:${user.phone}` || `whatsapp:${PHONE_ADMIN}`,
            body: `Se ha realizado un nuevo pedido por el usuario ${user.name} con el email: ${user.userEmail} y el teléfono: ${user.phone} con el siguiente detalle: ${order} \nTOTAL: $ ${total}`,
        };
        logger.info('Mensaje de orden enviado por WhatsApp');
        await client.messages.create(option);
    } catch (error) {
        logger.error('Error en sendWhatsApp', error);
    }
};
/* --------- --------- */
export const sendWhatsAppAdmin = async (order, total, user) => {
    try {
        const option = {
            from: 'whatsapp:+14155238886' || TWILIO_WHATSAPP_NUMBER,
            to: 'whatsapp:+5491165799996' || PHONE_ADMIN,
            body: `Se ha realizado un nuevo pedido por el usuario ${user.name} con el email: ${user.userEmail} y el teléfono: ${user.phone} con el siguiente detalle: ${order} \nTOTAL: $ ${total}`,
        };
        logger.info('Mensaje de orden enviado por WhatsApp /sendWhatsAppAdmin');
        await client.messages.create(option);
    } catch (error) {
        logger.error('Error en sendWhatsAppAdmin', error);
    }
};
