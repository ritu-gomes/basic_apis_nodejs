require('dotenv').config();
const path = require('path');
const usersRouter = require(path.join(process.cwd(), "src/modules/user/user.routes.js"));
const productsRouter = require(path.join(process.cwd(), "src/modules/product/product.routes.js"));
const userStrategy = require('../modules/user/user.strategy');
const cookieParser = require('cookie-parser');

const express = require('express');

module.exports = async function(){
    const app = express();

    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(express.json());

    usersRouter(app);
    productsRouter(app);
    userStrategy();

    return app;
};