const models = require('../models');

/**
 * Nombre del modelo
 */
const modelName = "products";


/**
 * Controller para los productos
 * Contiene las operaciones CRUD para el mismo
 */
module.exports = {
    /**
     * Obtiene los productos
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async getProducts(req, res) {

        let arrMsg = [];

        try {

            const productsList = await models.findAll({ modelName: modelName });

            // console.log(productsList);
            return res.status(200).send({ status: "Success", products: productsList });
        } catch (err) {
            arrMsg.push("Ocurrio un error inesperado");
            arrMsg.push(err);
            console.log(err)
            return res.status(200).send({ status: "Error", msg: arrMsg });
        }
    },
    /**
     * Actualiza un producto un prodcuto
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async updateProduct(req, res) {

        let arrMsg = [];

        const { product,filter } = req.body;

        try {

            const updatedProducts = await models.update({ modelName: modelName, modelObj: product,where: filter });

            // console.log(productsList);
            return res.status(200).send({ status: "Success", updatedProducts: updatedProducts });
        } catch (err) {
            arrMsg.push("Ocurrio un error inesperado");
            arrMsg.push(err);
            console.log(err)
            return res.status(200).send({ status: "Error", msg: arrMsg });
        }
    },
     /**
     * Agrega un prodcuto
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
      async addProduct(req, res) {

        let arrMsg = [];

        const { product } = req.body;

        try {

            const newProduct = await models.create({ modelName: modelName, modelObj: product });

            // console.log(productsList);
            return res.status(200).send({ status: "Success", newProduct: newProduct });
        } catch (err) {
            arrMsg.push("Ocurrio un error inesperado");
            arrMsg.push(err);
            console.log(err)
            return res.status(200).send({ status: "Error", msg: arrMsg });
        }
    },
    /**
    * Elimina un prodcuto
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async removeProduct(req, res) {

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
