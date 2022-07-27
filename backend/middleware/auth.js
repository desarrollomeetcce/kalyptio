const jwt = require("jsonwebtoken");

/**
 * Traemos las variables de entorno
 * Nos interesa la variable TOKEN_KEY
 */
const config = process.env;

/**
 * Verifica que las peticiones contengan un token
 * en el header x-access-token
 * o en alguna parte del body
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyToken = (req, res, next) => {

/**
 * Toma el header de validación
 * Esta validacion es temporal 
 * Debe usarse un JWT asignado cuando el usuario ingrese al sistema con suscredenciales
 */
  const token = req.headers["token-prueba-cambiar"];

  if(!token){
    return 
  }

  return next();
};

module.exports = verifyToken;