const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");


const productController = require('../controllers/productController.js')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(__dirname,"../../public/images/products"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage })


//Formulario de creación de productos
router.get("/create",productController.formCreation);
router.post('/',upload.single("image"), productController.crearProducto);

//Formualario de edición
router.get("/:id/edit", productController.formEdition);
router.put("/:id", productController.editarProducto)


router.get("/details/:id", productController.mostrarDetalleProducto);
router.get("/allProducts",productController.allProducts);

router.get("/delete", (req,res) => res.render("products/productDelete"))
router.delete("/:id/delete", productController.productDelete);
module.exports = router;