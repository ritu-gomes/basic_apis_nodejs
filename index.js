const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const {userSchema} = require('./userSchema');

app.use(express.json());
app.use('/users', usersRouter);

const productData = [
    {
        "id": "1",
        "name": "crop_top",
        "price": 500,
        "color": "yellow"
    },
    {
        "id": "2",
        "name": "high_west_jeans",
        "price": 350,
        "color": "blue"
    },
];


app.get("/products", (req, res) => {
    res.status(201).send(productData);
});

app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const the_product = productData.find(product => product.id == id);
    // console.log(the_product);
    if(!the_product){return res.status(404).send("product not found");};
    res.status(201).send(the_product);

});

app.post("/products", (req, res) => {
    const {id, name, price, color } = req.body;

    const newProduct = {
        id: id,
        name: name,
        price: price,
        color: color
    };

    productData.push(newProduct);
    res.status(201).send(productData);
});

app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const aimedProduct = productData.find(product => product.id == id);
    if(!aimedProduct){res.status(404).send("product not found")};
    const aimedProductIndex = productData.indexOf(aimedProduct);

    productData.splice(aimedProductIndex,1);
    res.status(201).send(productData);

});

app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const {name, price, color } = req.body;

    const aimedProduct = productData.find(product => product.id == id);

    if(!aimedProduct){ return res.send(404).send("product not found")};

    if (name) { aimedProduct.name = name };
    if (price) { aimedProduct.price = price };
    if (color) { aimedProduct.color = color };
    // aimedProduct = {...aimedProduct, name, price, color};

    res.status(201).send(aimedProduct);
});


app.listen(3000, () => {

    console.log("yes I'm listening");
});