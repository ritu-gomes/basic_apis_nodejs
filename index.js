const express = require('express');
const app = express();
const usersRouter = require('./routes/user.routes');
const productsRouter = require('./routes/product.routes');

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

app.listen(3000, () => {
    console.log("yes I'm listening");
});