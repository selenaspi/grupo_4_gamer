const express = require("express");
const router = express.Router();
const register = require('../controllers/registerController.js')

router.get("/", register.mostrarRegistro);

module.exports = router;