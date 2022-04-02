const express = require("express");
const router = express.Router();
const users = require('../controllers/usersController.js')

router.get("/login", users.mostrarLogin);
router.get("/register", users.mostrarRegistro);

module.exports = router;
