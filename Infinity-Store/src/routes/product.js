const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/images/products"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

//MIDDLEWARE 
const validator = require('../middlewares/validateProductMiddleware');

const productController = require('../controllers/productController.js')

//CREATE
router.get("/create", productController.creation);
router.post('/', upload.single("image"), validator, productController.store);

//READ - todos los productos + por producto
router.get("/:id/details", productController.productDetails);
router.get("/all", productController.allProducts);
// router.get("/search",productController.busqueda);  
router.post('/search', productController.busqueda);

//UPDATE
router.get("/:id/edit", productController.edition);
router.put("/:id", upload.single("image"), validator, productController.edit);

//DELETE
router.get("/:id/delete", (req, res) => res.render("products/productDelete", { id: req.params.id }))
router.delete("/:id/delete", productController.productDelete);


router.get("/category/:idCategory", productController.filterByCategory);
module.exports = router;