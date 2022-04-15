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

// GET ONE USER
router.get("/id:/", usersController.detail);

/*** EDIT ONE USER ***/ 
router.get('/edit/:id', usersController.edit); 
router.put('/:id', usersController.update); 


/*** DELETE ONE USER***/ 
router.delete('/:id', usersController.destroy);


router.get("/login", usersController.mostrarLogin);


module.exports = router;
