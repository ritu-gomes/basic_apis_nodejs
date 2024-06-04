const {validateProductInfo} = require('../validations/product.validate');

const productsData = [
    {
        "id": "1",
        "proname": "crop_top",
        "price": 500,
        "color": "yellow"
    },
    {
        "id": "2",
        "proname": "high_west_jeans",
        "price": 350,
        "color": "blue"
    },
];

const allProducts = (req, res) => {
    res.status(200).send(productsData);
};

module.exports.allProducts = allProducts;

const singleProduct = (req, res) => {
    const id = req.params.id;
    const theProduct = productsData.find(product => product.id == id);

    if (!theProduct) {
        return res.status(404).send("user not found");
    };
    
    res.status(200).send(theProduct);
};

module.exports.singleProduct = singleProduct;

const addProduct = async (req, res) => {
    const { proname, price, color } = req.body;

    try {
        const error = await validateProductInfo({proname, price, color});

        if(error) return res.status(400).send(error);

        // const Product = await Product.findOne({
        //     where: {
        //         email
        //     }
        // });

        const newProduct = {
            id: productsData.length+1,
            proname: proname,
            price: price,
            color: color
        }
        productsData.push(newProduct);

        res.status(201).send(productsData);

    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }

};

module.exports.addProduct = addProduct;

function deleteProduct(req, res) {
    const id = req.params.id;
    const theProduct = productsData.find(product => product.id == id);
    // console.log(theProduct);
    if(!theProduct){
        return res.status(404).send("Product not found");
    };
    const productIndex = productsData.indexOf(theProduct);
    // console.log(ProductIndex);
    productsData.splice(productIndex,1);
    res.status(201).send(productsData);
};

module.exports.deleteProduct = deleteProduct;

async function changeProductInfo(req, res ) {

    const id = req.params.id;
    const { proname, price, color } = req.body;

    try {
        const error = await validateProductInfo({proname, price, color});
        console.log(error);
        if(error) return res.status(400).send(error);

        // const user = await User.findOne({
        //     where: {
        //         email
        //     }
        // });

        const theProduct = productsData.find(product => product.id == id);

        if (!theProduct) {
            return res.status(404).send("user not found");
        };

        if(proname){theProduct.proname = proname};
        if(price){theProduct.price = price};
        if(color){theProduct.color = color};
    // theUser = { ...theUser, name, email_or_phone, password};
        res.status(201).send(productsData);

    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }

};

module.exports.changeProductInfo = changeProductInfo;