// REQUIRE'S
const express = require("express");
const router = express.Router();

// CONTROLLER REQUIRE
const usersController = require('../controllers/usersController')

// CREATE ONE USER 
router.post("/register", usersController.store);
router.get("/register", usersController.mostrarRegistro);

// GET ONE USER
router.get("/id:/", usersController.detail);

/*** EDIT ONE USER ***/ 
router.get('/edit/:id', usersController.edit); 
router.put('/:id', usersController.update); 


/*** DELETE ONE USER***/ 
router.delete('/:id', usersController.destroy);


router.get("/login", usersController.mostrarLogin);


module.exports = router;
