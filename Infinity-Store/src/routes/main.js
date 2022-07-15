const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController.js")

router.get("/", mainController.index);

router.get("/armar-pc", mainController.armarPc);

module.exports = router;