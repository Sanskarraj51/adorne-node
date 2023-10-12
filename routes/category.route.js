const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller')
router.post('/', categoryController.addCategory);
router.get('/', categoryController.getCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;