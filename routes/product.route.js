const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
const upload = require("../helper/productsUpload");
router.post("/", upload.array("images", 5), productController.addProduct);
router.get("/", productController.getProduct);
router.put("/:id", upload.array("images", 5), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.delete("/images/:id", productController.deleteImage);

module.exports = router;
