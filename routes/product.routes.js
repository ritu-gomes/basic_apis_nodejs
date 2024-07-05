const express = require('express');
const router = express.Router();
const { allProducts
    , addProduct
    , deleteProduct
    , changeProductInfo
    , singleProduct } = require('../controller/product.controller');
const validate = require('../middlewares/validate');
const {productSchema, productUpdateSchema} = require('../schema/product.schema');

router.get("/", allProducts);
router.get("/:id", singleProduct);
router.post("/", validate(productSchema), addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", validate(productUpdateSchema), changeProductInfo);

module.exports = router;