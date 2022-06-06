const express = require("express");
const router = express.Router();
const productCartController = require("../controllers/productCartController.js")

const authMiddleware = require('../middlewares/authMiddleware');

router.get("/", authMiddleware, productCartController.mostrarCarrito);

module.exports = router;