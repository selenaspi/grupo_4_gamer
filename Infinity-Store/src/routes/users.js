// REQUIRE'S
const express = require("express");
const router = express.Router();

// CONTROLLER REQUIRE
const usersController = require('../controllers/usersController')

// GET ALL USERS 
router.get("/", usersController.index);

// CREATE ONE USER 
router.get("/create", usersController.create);
router.post("/", usersController.store);


// GET ONE USER
router.get("/id:/", usersController.detail);

/*** EDIT ONE USER ***/ 
router.get('/edit/:id', usersController.edit); 
router.put('/:id', usersController.update); 


/*** DELETE ONE USER***/ 
router.delete('/:id', usersController.destroy);


router.get("/login", usersController.mostrarLogin);
router.get("/register", usersController.mostrarRegistro);

module.exports = router;
