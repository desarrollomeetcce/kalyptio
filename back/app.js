const express       = require('express');
const bodyParser    = require('body-parser');

const http = require('http');

/**
 * Framework para creación de servicios
 */
const app = express();

/**
 * Permite leer las variables de entorno
 * Las variables de entorno estan en el archivo .env
 */
require('dotenv').config()


/**
 * Decodifica la informacion de las peticiones
 * POST PUT PATCH DELETE
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Permite la comunicación con el frontend en caso de estar en diferentes puertos o ips
 * Permite el header que contiene la sesión del token 'token-prueba-cambiar'
 * Permite los métodos POST,GET y PATCH
 */
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", process.env.FRONT_ORIGIN);
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token-prueba-cambiar");
     res.header("Access-Control-Allow-Methods", "POST,GET,PATCH,PUT,DELETE");
     next();
});

/**
 * Agregamos las rutas del archivo
 */
require('./routes')(app);

/**
 * Mensaje genérico para la ruta raiz
 */
app.get('*', (req, res) => res.status(200).send({
     message: '¡Bienvenid@! El api esta arriba',
}));

/**
 *  Inica el servidor en el puerto configurado en .env
 */
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

/**
 * Inicia el servidor
 */
server.listen(port);

console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);

module.exports = app;