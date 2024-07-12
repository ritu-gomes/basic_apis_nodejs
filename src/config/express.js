const path = require('path');
const usersRouter = require(path.join(process.cwd(), "src/modules/user/user.routes.js"));
const productsRouter = require(path.join(process.cwd(), "src/modules/product/product.routes.js"));

const express = require('express');

module.exports = async function(){
    const app = express();

    app.use(express.json());

    usersRouter(app);
    productsRouter(app);

    return app;
};