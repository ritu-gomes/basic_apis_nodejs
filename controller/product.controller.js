const {validateProductInfo, validateProductUpdate} = require('../validations/product.validate');
const {Product} = require('../models/dbmodel');

const {where} = require('sequelize');


const allProducts = async (req, res) => {
    const products = await Product.findAll();
    console.log(products.every(pro => pro instanceof Product)); // true
    console.log('All products:', JSON.stringify(products, null, 2));
    res.status(200).send(products);
};

module.exports.allProducts = allProducts;

const singleProduct = async (req, res) => {
    const id = req.params.id;
    
    const theProduct = await Product.findOne({
        where: {
            id
        }
    });

    if (!theProduct) {
        return res.status(404).send("product not found");
    };
    
    res.status(200).send(theProduct);
};

module.exports.singleProduct = singleProduct;

const addProduct = async (req, res) => {
    const { proname, price, color } = req.body;

    try {
        const error = await validateProductInfo({proname, price, color});

        if(error) return res.status(400).send(error);

        const productExistence = await Product.findOne({
            where: {
                proname
            }
        });
        
        if(productExistence) return res.status(400).send('this product is already in the list');

        const newProduct = Product.create({
            proname: proname,
            price: price,
            color: color
        });
       
        res.status(201).send(newProduct);

    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }

};

module.exports.addProduct = addProduct;

async function deleteProduct(req, res) {
    const id = req.params.id;
    const theProduct = await Product.findOne({
        where: {
            id
        }
    });
    // console.log(theProduct);
    if(!theProduct){
        return res.status(404).send("product not found");
    };
    
    await Product.destroy({
        where: {
            id
        }
    });
    res.status(200).send(`productId: ${id} has been deleted suceessfully`);
};

module.exports.deleteProduct = deleteProduct;

async function changeProductInfo(req, res ) {

    const id = req.params.id;
    const { proname, price, color } = req.body;

    try {
        const theProduct = Product.findOne({
            where:{
                id
            }
        });

        if (!theProduct) {
            return res.status(404).send("user not found");
        };

        if(proname){
            Product.update(
                {proname},
                {where: {
                    id
                }}
            );
        };
        if(price){
            Product.update(
                {price},
                {where: {
                    id
                }}
            );
        };
        if(color){
            Product.update(
                {color},
                {where: {
                    id
                }}
            );
        };

        res.status(201).send(`product: ${id} has been updated suceessfully`);

    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }

};

module.exports.changeProductInfo = changeProductInfo;