const express = require('express');
const router = express.Router();
const { allProducts, addProduct, deleteProduct, changeProductInfo, singleProduct } = require('../controller/product.controller');

router.get("/", allProducts);
router.get("/:id", singleProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", changeProductInfo);

module.exports = router;