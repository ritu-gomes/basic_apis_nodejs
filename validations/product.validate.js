const {productSchema} = require('../schema/product.schema');

const validateProductInfo = async (product) => {
    try {
        await productSchema.validate(product);
        return null;
    } catch (error) {
        console.log(error);
        return error.errors[0];
    }
};

module.exports.validateProductInfo = validateProductInfo;