const express = require('express');
const router = express.Router();
const upload = require('../helper/brandUpload')
const brandController = require('../controller/brand.controller')
router.get('/', brandController.getBrandPublic);


module.exports = router;