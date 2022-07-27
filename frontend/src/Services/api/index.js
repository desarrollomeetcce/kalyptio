import axios from "axios";
import Cookies from 'universal-cookie';

/**
 * Error cuando el token caducó
 */
const UNAUTHORIZED = 401;

/**
 * Este componente gestiona la conexión con el backend
 * Agrega el header para el token
 */
const api = axios.create({
        baseURL: `${process.env.REACT_APP_BACK_URL}`,
});

/**
 * Middleware para agregar el token
 */
api.interceptors.request.use(
        request => {

                const cookies = new Cookies();
                const token = cookies.get(process.env.REACT_APP_COOKIE);

               
                request.headers = {
                        ...request.headers,
                        'token-prueba-cambiar':token
                }
               
                return request;
        },
        error => {
                const {status} = error.response;

                if (status === UNAUTHORIZED) {
               
                }
                return Promise.reject(error);
        }
);

/**
 * Middleware para revisar si el token es válido
 */
 api.interceptors.response.use(
        response => response,
        error => {
                const {status} = error.response;

                if (status === UNAUTHORIZED) {
                        const cookies = new Cookies();
                        cookies.remove(process.env.REACT_APP_COOKIE);
                        alert("Su sesión a caducado");
                        window.location.href="./login";
                }
                return Promise.reject(error);
        }
);

export default api;