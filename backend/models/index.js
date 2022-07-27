const fs = require('fs');
const fsPromises = fs.promises;


/**
 * Revisa que exista el modelo a consultar
 * De lo contrario lanza un error
 * @param {*} modelName 
 */
const validateExistModel = (modelName) => {
    /**
    * Si buscan un modelo erroneo
    */
    if (!modelName) {
        throw "No existe modelo en el sistema"
    }
}
/**
 * Mapea el objeto dentro del modelo
 * @param {*} modelObj 
 */
 const validateModelStructure = async (modelName,modelObj,removeNull = false) => {
    
    try{

        /**
         * Recuepra la estructura base del objeto
         */
        const modelObjtemp = await fsPromises.readFile(`models/${modelName}/base.json`, 'utf8');

        let modelObjMap = JSON.parse(modelObjtemp);

        /**
         * Objeto que contendrá el mapeo
         */
        let newModelObj = {};

        /**
         * Llena el objeto con los datos
         */
        Object.keys(modelObjMap).map((key)=>{
            if(removeNull){

                if( modelObj[key] != '' &&  modelObj[key] != null &&  modelObj[key]!= 0){
                    newModelObj[key] = modelObj[key];
                }
               
            }else{
                newModelObj[key] = 
                modelObj[key] ?  
                modelObj[key] : modelObj[key] == 0 ? 0:  modelObj[key];
            }
           
        })
        
        if(Object.keys(newModelObj).length == 0){
            throw "El objeto no puede estar vacio";
        }
        return newModelObj;
        
    }catch(err){
        throw err;
    }
}

/**
 * Generador de ids
 */

const generateId = () => {

    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
   
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
/**
 * Manejador de datos
 * Gestiona la lectura y escritura en los archivos
 */

module.exports = {
    /**
     * Obtiene la información de un modelo
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async findAll(data) {

        const { modelName } = data;

        validateExistModel(modelName);

        /**
         * Trae la información del modelo elegido
         * Devuelve un array
         */
        try {

            const listTemp = await fsPromises.readFile(`models/${modelName}/${modelName}.json`, 'utf8');

            /**
             * Consulta el arreglo con los datos
             */
            const list = JSON.parse(listTemp).dataValues;

            return list;

        } catch (err) {

            /**
             * Devuelve el error en caso de haber
             */
            throw err;
        }
    },

    /**
     * Obtiene la información de un registro
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     async findOne(data) {

        const { modelName,where } = data;

        validateExistModel(modelName);

        /**
         * Trae la información del modelo elegido
         * Devuelve un array
         */
        try {

            const listTemp = await fsPromises.readFile(`models/${modelName}/${modelName}.json`, 'utf8');

            /**
             * Consulta el arreglo con los datos
             */
            const list = JSON.parse(listTemp);


            let findList = [];

            let i = list.dataValues.length;
            while (i--) {
                Object.keys(where).map((k)=>{
                
                    if(list.dataValues[i][k] == where[k]){
                        findList.push(list.dataValues[i])
                        return true;
                    }
                })
 
            }

            return findList[0];

        } catch (err) {

            /**
             * Devuelve el error en caso de haber
             */
            throw err;
        }
    },

    /**
    * Agrega información 
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async create(data) {

        const { modelName,modelObj } = data;

        validateExistModel(modelName);

       
        /**
         * Trae la información del modelo elegido
         * Devuelve un array
         */
        try {
            /**
             * Valida que el modelo contenga información
             */            

            const newModelObj = await validateModelStructure(modelName,modelObj);


            const listTemp = await fsPromises.readFile(`models/${modelName}/${modelName}.json`, 'utf8');

            /**
             * Consulta el arreglo con los datos
             */
            const list = JSON.parse(listTemp);
             
            /**
             * Genera el id
             */

          
            newModelObj.id = generateId();
            list.dataValues.push(newModelObj);

            await fsPromises.writeFile(`models/${modelName}/${modelName}.json`,JSON.stringify(list), 'utf8');

            return newModelObj;

        } catch (err) {

            /**
             * Devuelve el error en caso de haber
             */
            throw err;
        }
    },
    /**
    * Actualiza información 
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
     async update(data) {

        const { modelName,modelObj,where } = data;

        validateExistModel(modelName);

       
        /**
         * Trae la información del modelo elegido
         * Devuelve un array
         */
        try {
            /**
             * Valida que el modelo contenga información
             */            

            const newModelObj = await validateModelStructure(modelName,modelObj,true);

           // console.log(newModelObj);
            const listTemp = await fsPromises.readFile(`models/${modelName}/${modelName}.json`, 'utf8');

            /**
             * Consulta el arreglo con los datos
             */
            const list = JSON.parse(listTemp);
             
            let updatedList = [];

            let i = list.dataValues.length;
            while (i--) {
                Object.keys(where).map((k)=>{
                
                    if(list.dataValues[i][k] == where[k]){
                       
                        list.dataValues[i] ={... list.dataValues[i], ...newModelObj};
                        updatedList.push(list.dataValues[i])
                        return true;
                    }
                })
 
            }

            await fsPromises.writeFile(`models/${modelName}/${modelName}.json`,JSON.stringify(list), 'utf8');

            return updatedList;

        } catch (err) {

            /**
             * Devuelve el error en caso de haber
             */
            throw err;
        }
    },
    /**
    * Elimina un registro por id o campo que coincida 
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async delete(data) {
    
        const { where={},modelName} = data;

      
        validateExistModel(modelName);

       
        /**
         * Trae la información del modelo elegido
         * Devuelve un array
         */
        try {

            const listTemp = await fsPromises.readFile(`models/${modelName}/${modelName}.json`, 'utf8');

            /**
             * Consulta el arreglo con los datos
             */
            let list = JSON.parse(listTemp);

            let i = list.dataValues.length;

            let deletedList = [];
            /**
             * Recorre el arreglo y elimina los elemtos que coincidan
             */
            while (i--) {
                Object.keys(where).map((k)=>{
                
                    if(list.dataValues[i][k] == where[k]){
                        deletedList.push(list.dataValues[i])
                        list.dataValues.splice(i, 1);
                        return true;
                    }
                })
 
            }

            //console.log(list);

            await fsPromises.writeFile(`models/${modelName}/${modelName}.json`,JSON.stringify(list), 'utf8');

            return deletedList;

        } catch (err) {

            /**
             * Devuelve el error en caso de haber
             */
            throw err;
        }
    },

};
