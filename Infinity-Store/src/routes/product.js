const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController.js')

//Formulario de creación de productos
router.get("/create",productController.formCreation);
router.post('/', productController.crearProducto);

//Formualario de edición
router.get("/:id/edit", productController.formEdition);
router.put("/:id", productController.editarProducto)


router.get("/details/:id", productController.mostrarDetalleProducto);
router.get("/allProducts",productController.allProducts);

module.exports = router;