const products = require("../database/products.json");
const category = require("../database/category.json")
const fs = require('fs');
const path = require('path')
let productsJSON = JSON.stringify(products);
let productsList = JSON.parse(productsJSON);
let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);

<<<<<<< HEAD

const productosfilePath = path.join(__dirname, '../database/products.json');
let productos = JSON.parse(fs.readFileSync(productosfilePath, 'utf-8'));
=======
const productosfilePath = path.join(__dirname, '../database/products.json');
let productos = JSON.parse(fs.readFileSync(productosfilePath, 'utf-8'));

let productosActivos = productos.filter(producto => producto.alta);
>>>>>>> dc607f64bb51b7f4068d36172a04ac992235b513

const controller = {

    mostrarDetalleProducto: (req, res) => {
        let idProducto = Number(req.params.id);
<<<<<<< HEAD
        let listaProductos = [productsList[idProducto], productsList[idProducto + 1], productsList[idProducto + 2], productsList[idProducto + 3]];

        res.render("products/productDetails", { similares: listaProductos, detalle: productsList[idProducto - 1], categoryList })
=======
        let listaProductos = [productosActivos[idProducto], productosActivos[idProducto + 1], productosActivos[idProducto + 2], productosActivos[idProducto + 3]];

        res.render("products/productDetails", { similares: listaProductos, detalle: productosActivos[idProducto - 1], categoryList })
>>>>>>> dc607f64bb51b7f4068d36172a04ac992235b513
    },

    formCreation: (req, res) => {
        res.render("products/productCreationEdition", {
            metodo: "POST",
            ruta: "",
            categoryList
        })
    },

    crearProducto: (req, res) => {
        let ids = [];
        productos.forEach(producto => { ids.push(producto.id) });
        let maxId = Math.max(...ids);

        let offSaleOn = req.body.checkDescuento === "on" ? true : false;

        let discountUpdate = offSaleOn ? req.body.discount : 0;

        let newProduct = {
            id: maxId + 1,
<<<<<<< HEAD
=======
            alta: true,
>>>>>>> dc607f64bb51b7f4068d36172a04ac992235b513
            name: req.body.name,
            idCategory: req.body.category,
            description: req.body.description,
            data_sheet: [],
            image: req.file.filename,
            color: [],
            price: req.body.price,
            offSale: offSaleOn,
            discount: discountUpdate,
            stock: req.body.stock,
        }

        productos.push(newProduct);
        fs.writeFileSync(productosfilePath, JSON.stringify(productos));

        res.redirect('/');
    },

    formEdition: (req, res) => {
        idQuery = Number(req.params.id);
        let productoElegido;

        productsList.forEach(producto => {
            if (producto.id === idQuery) {
                productoElegido = producto
            }
        });

        // res.send(productoElegido)
        res.render("products/productCreationEdition", {
            metodo: "PUT",
            ruta: req.params.id + "?_method=PUT",
            producto: productoElegido,
            categoryList
        })
    },

    editarProducto: (req, res) => {

        let offSaleOn = req.body.checkDescuento === "on" ? true : false;

        productos = productos.map(producto => {
            if (producto.id == req.params.id) {
                producto = {
                    id: Number(req.params.id),
<<<<<<< HEAD
=======
                    alta: true,
>>>>>>> dc607f64bb51b7f4068d36172a04ac992235b513
                    name: req.body.name,
                    idCategory: Number(req.body.category),
                    description: req.body.description,
                    data_sheet: [],
                    image: "",
                    color: [],
                    price: Number(req.body.price),
                    offSale: offSaleOn,
                    discount: offSaleOn === true ? Number(req.body.discount) : 0,
                    stock: Number(req.body.stock)
                }
            }
            return producto
        });


        fs.writeFileSync(productosfilePath, JSON.stringify(productos));

        res.redirect('/');
    },
    allProducts: (req, res) => {

<<<<<<< HEAD
        res.render("products/allProducts", { similares: productsList, categoryList })
    },
    productDelete: (req, res) => {
        const id = req.params.id;
        productsList = products.filter(productos => productos.id != id);
        fs.writeFileSync(productosfilePath, JSON.stringify(productsList));
        console.log(id)
        res.redirect('/')}

    }

=======
        res.render("products/allProducts", { similares: productosActivos, categoryList })
    },
    productDelete: (req, res) => {
        const id = req.params.id;
        productos = productos.map(producto => {
            if (producto.id == req.params.id) {
                producto = {
                    id: Number(req.params.id),
                    alta: false,
                    name: producto.name,
                    idCategory: producto.idCategory,
                    description: producto.description,
                    data_sheet: [],
                    image: "",
                    color: [],
                    price: producto.price,
                    offSale: producto.offSale,
                    discount: producto.discount,
                    stock: producto.stock
                }
            }
            console.log(producto);
            return producto;
        });
        fs.writeFileSync(productosfilePath, JSON.stringify(productos));
        res.redirect('/')
    }


}
>>>>>>> dc607f64bb51b7f4068d36172a04ac992235b513



module.exports = controller;

