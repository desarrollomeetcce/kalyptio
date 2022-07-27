const models = require('../models');

/**
 * Nombre del modelo
 */
const modelName = "shoppingCars";

/**
 * Valida si existe cantidad suficiente para la transacción
 * @returns 
 */
const validateInventary = async (shoppingCar)=>{

    let updatedShoppingCar = shoppingCar;


    let total = 0;
    /**
     * Comienza la validacion contra inventario
     */
    await Promise.all(Object.keys(shoppingCar.products).map(async (key)=>{

        const product = await models.findOne({ modelName: 'products', where: {"code": key} });

        if(!product){
            throw "El producto no existe en el inventario"
        }
        /**
         * Revisa si hay suficiente en el inventario
         * Sino no permite la operación
         */
        if(shoppingCar.products[key].amount <= product.stock){

            shoppingCar.products[key].price = product.price;
            shoppingCar.products[key].name = product.name;
            shoppingCar.products[key].total = product.price * shoppingCar.products[key].amount;
            shoppingCar.products[key].tempTotal = product.price * shoppingCar.products[key].amount;
            shoppingCar.products[key].promo = product.promo;
           
            /**
             * Valida las promociones
             * X - tipo de promoción 2X1 o 3X2 etc
             * D - Tipo de promoción descuento por comprar mas de x produto
             */

             product?.promo?.map((promo,j)=>{
           
                //{"kind": "X", "amount":2,"disocunt": 1, "percent": 0}
                if(promo.kind == "X"){
                    let discountProducts =  Math.floor(shoppingCar.products[key].amount / promo.amount); 

                   // console.log(`${discountProducts} from ${shoppingCar.products[key].amount}`);

                    shoppingCar.products[key].total = shoppingCar.products[key].total- (product.price * discountProducts);
                }

                //{"kind": "D", "amount":3,"disocunt": 0, "percent": 25}
                if(promo.kind == "D"){
                    if(shoppingCar.products[key].amount >= promo.amount){

                        let percentDiscount = ((shoppingCar.products[key].total * promo.percent) / 100);
                        console.log(`${promo.amount} descuento de ${percentDiscount} a ${shoppingCar.products[key].total}`)
                        shoppingCar.products[key].total = shoppingCar.products[key].total- percentDiscount;
                    }
                }

             })


            updatedShoppingCar.products[key] = shoppingCar.products[key];
            

            total += shoppingCar.products[key].total;
        }else{
            delete updatedShoppingCar.products[key];
            updatedShoppingCar.products[key] = {error: "No hay suficiente cantidad en stock"}
        }

        /**
         * Revisa las promociones
         */


        return true;

    }))

    updatedShoppingCar.total = total;
    

    return updatedShoppingCar;
}
/**
 * Controller para el carrito de compra
 * Contiene las operaciones CRUD para el mismo
 */
module.exports = {
    /**
     * Obtiene los productos
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async getShopoingCar(req, res) {

        let arrMsg = [];

        const {filter} = req.body;

        try {

            if(filter){

                const carList = await models.findOne({ modelName: modelName,where :filter });
                return res.status(200).send({ status: "Success", cars: carList ? carList : []});
                
            }else{

                const carList = await models.findAll({ modelName: modelName });
                return res.status(200).send({ status: "Success", cars: carList ? carList : []});
            }
           
        } catch (err) {
            arrMsg.push("Ocurrio un error inesperado");
            arrMsg.push(err);
            console.log(err)
            return res.status(200).send({ status: "Error", msg: arrMsg });
        }
    },
    /**
     * Actualiza un carrito de compra un prodcuto
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async updateCar(req, res) {

        let arrMsg = [];

        const { shoppingCar,filter } = req.body;

        try {

          
            let updatedCar = await validateInventary(shoppingCar);
            
            const updatedCars = await models.update({ modelName: modelName, modelObj: updatedCar,where: filter });

            return res.status(200).send({ status: "Success", updatedCars: updatedCars });

        } catch (err) {
            arrMsg.push("Ocurrio un error inesperado");
            arrMsg.push(err);
            console.log(err)
            return res.status(200).send({ status: "Error", msg: arrMsg });
        }
    },
     /**
     * Agrega un carrito de compra
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async addCar(req, res) {

        let arrMsg = [];

        const { shoppingCar } = req.body;

        try {
            let updatedCar = await validateInventary(shoppingCar);
            const newCar = await models.create({ modelName: modelName, modelObj: updatedCar });

            // console.log(productsList);
            return res.status(200).send({ status: "Success", newCar: newCar });
        } catch (err) {
            arrMsg.push("Ocurrio un error inesperado");
            arrMsg.push(err);
            console.log(err)
            return res.status(200).send({ status: "Error", msg: arrMsg });
        }
    },
    /**
    * Elimina un carrito de compra
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async removeCar(req, res) {

        let arrMsg = [];

        const { filter={} } = req.body;

        try {

            const list = await models.delete({ modelName: modelName,where: filter });

            // console.log(productsList);
            return res.status(200).send({ status: "Success", product: list });
        } catch (err) {
            arrMsg.push("Ocurrio un error inesperado");
            arrMsg.push(err);
            console.log(err)
            return res.status(200).send({ status: "Error", msg: arrMsg });
        }
    },

};
