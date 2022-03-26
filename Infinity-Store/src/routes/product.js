const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController.js')

router.get("/product-creation",productController.crearProducto)
router.get("/details", productController.mostrarDetalleProducto);

module.exports = router;