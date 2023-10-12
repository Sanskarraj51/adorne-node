const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller')
router.get('/', productController.getProductPublic);
router.get('/product-detail', productController.getProductDetail);
router.get('/search-products', productController.searchProduct);


module.exports = router;