const products = require("../database/products.json");
const category = require("../database/category.json")
const fs = require('fs');
const path = require('path')
let productsJSON = JSON.stringify(products);
let productsList = JSON.parse(productsJSON);
let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);


const productosfilePath = path.join(__dirname, '../database/products.json');
let productos = JSON.parse(fs.readFileSync(productosfilePath, 'utf-8'));

const controller = {

    mostrarDetalleProducto: (req, res) => {
        let idProducto = Number(req.params.id);
        let listaProductos = [productsList[idProducto], productsList[idProducto + 1], productsList[idProducto + 2], productsList[idProducto + 3]];

        res.render("products/productDetails", { similares: listaProductos, detalle: productsList[idProducto - 1], categoryList })
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

        res.render("products/allProducts", { similares: productsList, categoryList })
    },
    productDelete: (req, res) => {
        const id = req.params.id;
        productsList = products.filter(productos => productos.id != id);
        fs.writeFileSync(productosfilePath, JSON.stringify(productsList));
        console.log(id)
        res.redirect('/')}
    
    
    }



module.exports = controller;

