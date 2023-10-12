const express = require('express');
const router = express.Router();
const upload = require('../helper/brandUpload')
const brandController = require('../controller/brand.controller')
router.post('/', upload.single('icon'),brandController.addBrand);
router.get('/', brandController.getBrand);
router.put('/:id', brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

module.exports = router;