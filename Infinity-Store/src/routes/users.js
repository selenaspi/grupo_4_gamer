const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const productController = require('../controllers/productController.js')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/images/usuarios"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

// CONTROLLER REQUIRE
const usersController = require('../controllers/usersController')
const guestMiddleware = require('../middlewares/guestMiddleware');

// Formulario de creación de usuarios - CREATE
router.get("/register", usersController.register);
router.post("/register", upload.single("image"), usersController.store);

//Perfil de usuario - READ
router.get("/profileUser", usersController.profileUser);

//Formulario de edición - UPDATE
router.get('/:id/edit', usersController.edition);
router.put('/:id', upload.single("image"), usersController.edit);

// DELETE ONE USER - DELETE
router.get("/:id/delete", usersController.mostrarBorradoDeUsuario);
router.delete("/:id", upload.single("image"), usersController.deleteUser);

/*** LOGIN ***/
router.get("/login", usersController.mostrarLogin);
// Procesar el login
router.post('/login', usersController.loginProcess);
/*** PROFILE USER ***/
// router.get("/profileUser",usersController.mostrarProfileUser);


module.exports = router;
