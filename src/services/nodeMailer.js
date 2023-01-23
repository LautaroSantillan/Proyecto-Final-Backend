import { createTransport } from 'nodemailer';
import { logger } from "../utils/logger.js";
import dotenv from 'dotenv';
dotenv.config()
/* --------- --------- */
const MAIL = process.env.MAIL;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const MAIL_ADMIN = process.env.MAIL_ADMIN;
/* --------- No me toma en cuenta los .env que importo, además también que puse las credenciales en el node_modules --------- */
export const sendEmailNewUser = async ( user ) =>{
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'aric16@ethereal.email' || MAIL,
            pass: 'Xa958vf74cNVTPNKRX' || MAIL_PASSWORD,
        },
    });
    
    const mailOptions = {
        from: 'Servidor',
        to: 'santillanlautaro03@gmail.com' || MAIL_ADMIN,
        subject: 'Nuevo Registro de Usuario',
        html: `<html><h1>Se ha registrado un nuevo usuario:</h1>
            <hr>
            <p><span style="font-weight: bolder">${user.name}</span>, con el email: <span style="font-weight: bolder">${user.userEmail}</span></p></html>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info('Mail nuevo usario' , info);
    } catch (error) {
        logger.error('Error en mailOptions', error);
    }
}

export const sendEmailNewOrder = async ( order, total, user ) =>{
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'aric16@ethereal.email' || MAIL,
            pass: 'Xa958vf74cNVTPNKRX' || MAIL_PASSWORD,
        },
        secure: false,
        tls: {
            rejectUnauthorized: false
        }
    });
    
    const mailOptions = {
        from: 'Servidor',
        to: 'santillanlautaro03@gmail.com' || MAIL_ADMIN, 
        subject: 'Nueva Orden de Compra',
        html: `<html><h1>Se ha realizado un nuevo pedido:</h1> 
            <hr>
            <p>Por el usuario ${user.name}, con el email: ${user.userEmail} y el teléfono: ${user.phone}</p>
            <br>
            <p><span style="text-decoration: underline">Con el siguiente detalle:</span> ${order}</p> 
            <br>
            <p style="font-weight: bolder"><span style="text-decoration: underline">TOTAL:</span> $${total}</p></html>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info('Mail nueva orden enviado' , info);
    } catch (error) {
        logger.error('Error en mailOptions', error);
    }
}