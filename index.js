const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products')
const {userSchema} = require('./schema/userSchema');

app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000, () => {

    console.log("yes I'm listening");
});