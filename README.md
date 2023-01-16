# CoderHouse Final Backend Project

## Autor

* **Lautaro Santillan** - *Initial developer*  

## Description
The job consists of developing the backend of an e-commerce application to be able to sell products of a chosen category. With a REST API that carries the business logic.

## [Project instructions](https://docs.google.com/document/d/1bVNLHkuWU2ao1DWFQLK2qRH9Fw9PIqzl4xkQp0UNtmg/edit)

## [Link Railway]() 

***WEB PREVIEW***
![ecommerce capture](https://firebasestorage.googleapis.com/v0/b/fotoscap-6a770.appspot.com/o/PreviewWeb.png?alt=media&token=1a87a160-b512-456c-83a2-518963a984ee)


## Installation

1.  Clone the repository

2.  Install NPM packages

```bash
npm install
```
3. Start the server
```bash
node server.js
```

## Environment Variables

Data to configure the server (.env file)

    PORT='Port to deploy the app, for example: 8080'

    COOKIES_SECRET='Cookies that the app will have, for example: 123456'

    SESSION_SECRET='Session that the app will have, for example: 123456'

    MONGO_USER='User to connect to MongoDB'

    MONGO_PASSWORD='Password to connect to MongoDB'

    MONGO_HOST='Host to connect to MongoDB'

    DAO_MENSAJES='Memory persistence, for example: mongo'

    DAO_PRODUCTOS='Memory persistence, for example: mongo'

    DAO_CARRITOS='Memory persistence, for example: mongo'

    DAO_ORDER='Memory persistence, for example: mongo'

    MAIL='Mail from NodeMailer'

    MAIL_PASSWORD='Password NodeMailer'

    MAIL_ADMIN='Preferred email for test emails to arrive'

    TWILIO_ACCOUNT_SID='Account SID provided by Twilio'

    TWILIO_AUTH_TOKEN='Authentication token provided by Twilio'

    TWILIO_PHONE_NUMBER='Test phone number given by Twilio'

    PHONE_ADMIN='Personal number'

    TWILIO_WHATSAPP_NUMBER='Whatsapp:+número al que llegaría la notificación de Twilio'

    JWT_SECRET='JWT secret key'

## Useful information

* When entering the localhost of the server through the browser you will find a screen to log in or register.
* After logging in with a validated account, you are redirected to the home where you can see the products.
* There we have a navbar that leads to different sections: user profile, server information, user cart, webchat, and to log out.

## Used tools

- **JavaScript** : Interpreted programming language
- **Node Js** : Open source server environment
- **Express** : Web application framework
- **MongoDB** : NOSql Database
- **Mongoose** : Library that creates a connection between MongoDB and Express
- **Twilio** : Programmable communication tool
- **Nodemailer** : Mail manager
- **JWT** : Authorization token generator
- **Passport** :  Express-compatible authentication middleware for Node. js
- **Bcrypt** : Password encryptor
- **Compression** : Package decreases the downloadable amount of data that's served to users.
- **Handlebars** : Templating language for the views
- **Morgan** :
- **Socket.io** : Library for real-time web applications. Used for the chat
- **Winston** : Most popular logging library for Node. js
- **Schema** : Schema of a database
- **Normalizr** : Normalizes and denormalizes JSON according to schema for Redux and Flux applications.
- **multer** : NPM package that makes it easy to handle file uploads
- **yargs** : Interactive command line tool, by parsing arguments and generating an elegant user interface

@everyone :shipit: => I hope you liked the project!! :wink: