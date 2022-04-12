const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController.js')

router.get("/product-creation",productController.formCreation);
router.get("/product-edition", productController.editarProducto);
router.get("/details/:id", productController.mostrarDetalleProducto);
router.post("/creacion", productController.crearProducto);
router.get("/allProducts",productController.allProducts);
module.exports = router;