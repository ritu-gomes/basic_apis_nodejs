const path = require('path');
const controller = require('./product.controller');
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.js"));
const {productSchema, productUpdateSchema} = require('./product.schema');

module.exports = app => {
    app.route("/api/products")
        .get(controller.allProducts)
        .post(controller.addProduct);
    app.route("/api/products/:id")
        .get(controller.singleProduct)
        .delete(controller.deleteProduct)
        .put(validate(productUpdateSchema), controller.changeProductInfo);
}