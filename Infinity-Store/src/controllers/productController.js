const Product = require('../database/models/Product.js');

const category = require("../database/category.json")
let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);

let similarCategories = function (idCategorySimilar, productoBuscado) {
    let similaresByCategory = [], similares = [];
    do {
        if (idCategorySimilar == (categoryList.length + 1)) {
            idCategorySimilar = 1;
        }
        similaresByCategory = Product.filterActivesByField("idCategory", idCategorySimilar);
        similaresByCategory = similaresByCategory.filter(product => product.id != productoBuscado.id)
        if (similaresByCategory.length != 0) {
            for (i = 0; i < similaresByCategory.length; i++) {
                if (similares.length < 4) {
                    similares.push(similaresByCategory[i])
                }
            }
        }
        idCategorySimilar++
    } while (similares.length < 4);
    return similares
}

const controller = {

    //CREATE
    creation: (req, res) => {
        res.render("products/productCreationEdition", {
            metodo: "POST",
            ruta: "",
            categoryList
        })
    },

    store: (req, res) => {

        let offSaleOn = req.body.checkDescuento === "on" ? true : false;

        let discountUpdate = offSaleOn ? req.body.discount : 0;

        const productData = {
            alta: true,
            name: req.body.name,
            idCategory: Number(req.body.category),
            description: req.body.description,
            data_sheet: [],
            image: req.file.filename,
            color: [],
            price: Number(req.body.price),
            offSale: offSaleOn,
            discount: Number(discountUpdate),
            stock: Number(req.body.stock),
        }

        Product.create(productData);

        res.redirect('/');
    },

    //READ
    productDetails: (req, res) => {
        let productoBuscado = Product.findByPk(Number(req.params.id));

        let similares = similarCategories(productoBuscado.idCategory, productoBuscado);

        res.render("products/productDetails", { similares, detalle: productoBuscado, categoryList })
    },

    allProducts: (req, res) => {

        res.render("products/allProducts", { similares: Product.findActiveProducts(), categoryList })
    },

    //UPDATE

    edition: (req, res) => {
        let productoElegido = Product.findByPk(Number(req.params.id));

        res.render("products/productCreationEdition", {
            metodo: "PUT",
            ruta: req.params.id + "?_method=PUT",
            producto: productoElegido,
            categoryList
        })
    },

    edit: (req, res) => {

        let offSaleOn = req.body.checkDescuento === "on" ? true : false;

        let productToEdit = Product.findByPk(Number(req.params.id));

        let productoEditado = {
            ...productToEdit,
            name: req.body.name,
            idCategory: Number(req.body.category),
            description: req.body.description,
            data_sheet: [],
            image: req.file ? req.file.filename : productToEdit.image,
            color: [],
            price: Number(req.body.price),
            offSale: offSaleOn,
            discount: offSaleOn === true ? Number(req.body.discount) : 0,
            stock: Number(req.body.stock)

        }

        Product.edition(productoEditado);

        res.redirect('/');
    },

    //DELETE
    productDelete: (req, res) => {
        Product.delete(Number(req.params.id));
        res.redirect('/')
    }, 

    filterByCategory: (req, res) => {
        res.render("products/allProducts", { similares: Product.filterActivesByField("idCategory", req.params.idCategory), categoryList }) //no debería llamarse similares pero bue
    }
}

module.exports = controller;