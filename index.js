const express = require('express');
const app = express();

app.use(express.json());
const userData = [
    {
        "id": "1",
        "name": "Sara",
        "email_or_phone": "sara123@gmail.com",
        "password": "laal33&"
    },
    {
        "id": "2",
        "name": "elsa",
        "email_or_phone": "elsa55@gmail.com",
        "password": "kfg33&"
    }
]

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
]

app.get("/users", (req, res) => {
    res.status(201).send(userData);
}); 

app.post("/users", (req, res) => {
    const { id, name, email_or_phone, password } = req.body;
    // console.log(req.body.email_or_phone);
    const newUser = {
        id: id,
        name: name,
        email_or_phone: email_or_phone,
        password: password
    };

    userData.push(newUser);
    res.status(201).send(userData);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const theUser = userData.find(user => user.id == id);
    // console.log(theUser);
    if(!theUser){
        return res.status(404).send("user not found");
    };
    const userIndex = userData.indexOf(theUser);
    // console.log(userIndex);
    userData.splice(userIndex,1);
    res.send(userData);
});

app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const { name, email_or_phone, password } = req.body;

    const theUser = userData.find(user => user.id == id);

    if (!theUser) {
        return res.status(404).send("user not found");
    };

    if(name){theUser.name = name};
    if(email_or_phone){theUser.email_or_phone = email_or_phone};
    if(password){theUser.password = password};
    // theUser = { ...theUser, name, email_or_phone, password};

    res.status(201).send(userData);
});


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