const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");


const productController = require('../controllers/productController.js')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(__dirname,"../../public/images/usuarios"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage })

// CONTROLLER REQUIRE
const usersController = require('../controllers/usersController')

// Formulario de creación de usuarios
router.post("/register",upload.single("image"), usersController.store);
router.get("/register", usersController.mostrarRegistro);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 38dc2fc51318a14dd8c5fb547c9e6243c7929712
=======
>>>>>>> 38dc2fc51318a14dd8c5fb547c9e6243c7929712
=======
>>>>>>> 1daf3f10fb1d6cff96bc6e6d0fd310382392d987

// GET ONE USER
router.get("/id:/", usersController.detail);

/*** EDIT ONE USER ***/ 
router.get('/edit/:id', usersController.edit); 
router.put('/:id', usersController.update); 


/*** DELETE ONE USER***/ 
router.delete('/:id', usersController.destroy);


router.get("/login", usersController.mostrarLogin);


module.exports = router;
