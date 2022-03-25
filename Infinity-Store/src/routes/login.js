const express = require("express");
const router = express.Router();
const login = require('../controllers/loginController.js')

router.get("/", login.mostrarLogin);

module.exports = router;