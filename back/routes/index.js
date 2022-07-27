/** Controller para productos */
const productsController = require('../controllers/ProductsController');

/** Controller para productos */
const carsController = require('../controllers/ShoppingCarsController');

/** Middleware para validar JWT */
const auth = require('../middleware/auth');


module.exports = (app) => {
    /**
     * Rutas para las operaciones de los productos
     */
    app.get('/api/products', auth, productsController.getProducts);
    app.post('/api/product', auth, productsController.addProduct);
    app.put('/api/product', auth, productsController.updateProduct);
    app.delete('/api/product', auth, productsController.removeProduct);


    /**
     * Rutas para las operaciones de los carritos de compra
     */
    app.get('/api/shoppingcars', auth, carsController.getShopoingCar);
    app.post('/api/shoppingcar', auth, carsController.addCar);
    app.put('/api/shoppingcar', auth, carsController.updateCar);
    app.delete('/api/shoppingcar', auth, carsController.removeCar);
}
