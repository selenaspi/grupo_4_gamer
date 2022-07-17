const db = require('../database/models');
const Op = db.Sequelize.Op
const { validationResult } = require('express-validator');

let categoriesPromise = db.ProductCategory.findAll()

const controller = {

    //CREATE
    creation: (req, res) => {
        Promise.all([categoriesPromise]).then(function ([categories]) {
            res.render("products/productCreationEdition", {
                metodo: "POST",
                ruta: "",
                categoryList: categories

            })
        }).catch(err => {
            return res.status(404).send({ message: err });
        })
    },

    store: (req, res) => {

        const errors = validationResult(req);
        let offSaleOn = req.body.checkDescuento === "on" ? 1 : 0;
        let discountReq = offSaleOn ? req.body.discount : 0;

        if (errors.isEmpty()) {

            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                price: Number(req.body.price),
                off_sale: offSaleOn,
                discount: Number(discountReq),
                stock: Number(req.body.stock),
                product_category_id: Number(req.body.category),
                alta: 1
            })

            res.redirect('/');

        } else {
            Promise.all([categoriesPromise]).then(function ([categories]) {
                res.render("products/productCreationEdition", {
                    metodo: "POST",
                    ruta: "",
                    categoryList: categories,
                    errors: errors.mapped(),
                    old: req.body
                })
            }).catch(err => {
                return res.status(404).send({ message: err });
            })
        }


    },

    //READ
    productDetails: (req, res) => {
        let productPromise = db.Product.findByPk(Number(req.params.id));

        Promise.all([categoriesPromise, productPromise]).then(function ([categories, product]) {

            let idSimilarCategory;

            if (product.product_category_id < 6) {
                idSimilarCategory = 6
            } else {
                idSimilarCategory = product.product_category_id;
            }

            db.Product.findAll({
                where: {
                    product_category_id: { [Op.gte]: idSimilarCategory - 5 },
                    id: { [Op.ne]: product.id }
                }, limit: 4
            }).then(similares => {
                res.render("products/productDetails", { similares, detalle: product, categoryList: categories })
            }).catch(err => {
                return res.status(404).send({ message: err });
            })

        }).catch(err => {
            return res.status(404).send({ message: err });
        })

    },

    allProducts: (req, res) => {

        let productsPromise = db.Product.findAll();

        Promise.all([categoriesPromise, productsPromise]).then(function ([categories, products]) {
            res.render("products/allProducts", { similares: products, categoryList: categories, buscado : null })
        }).catch(err => {
            return res.status(404).send({ message: err });
        })

    },

    //UPDATE

    edition: (req, res) => {

        let productPromise = db.Product.findByPk(Number(req.params.id))

        Promise.all([categoriesPromise, productPromise]).then(function ([categories, product]) {
            if(product && product.alta){
                res.render("products/productCreationEdition", {
                metodo: "PUT",
                ruta: req.params.id + "?_method=PUT",
                id: req.params.id,
                producto: product,
                categoryList: categories
            })}
            else{return res.status(404).send("Producto no encontrado")}
        }).catch(err => {
            return res.status(404).send({ message: err });
        })

    },

    edit: (req, res) => {

        const errors = validationResult(req);
        let offSaleOn = req.body.checkDescuento === "on" ? 1 : 0;
        let discountReq = offSaleOn ? req.body.discount : 0;

        if (errors.isEmpty()) {

            if (req.file) {
                db.Product.update({
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file.filename,
                    price: Number(req.body.price),
                    off_sale: offSaleOn,
                    discount: Number(discountReq),
                    stock: Number(req.body.stock),
                    product_category_id: Number(req.body.category),
                }, {
                    where: {
                        id: Number(req.params.id)
                    }
                })

            } else {

                db.Product.update({
                    name: req.body.name,
                    description: req.body.description,
                    price: Number(req.body.price),
                    off_sale: offSaleOn,
                    discount: Number(discountReq),
                    stock: Number(req.body.stock),
                    product_category_id: Number(req.body.category),
                }, {
                    where: {
                        id: Number(req.params.id)
                    }
                })

            }

            res.redirect('/');

        } else {

            let productPromise = db.Product.findByPk(Number(req.params.id))

            Promise.all([categoriesPromise, productPromise]).then(function ([categories, product]) {
                res.render("products/productCreationEdition", {
                    metodo: "PUT",
                    ruta: req.params.id + "?_method=PUT",
                    producto: product,
                    categoryList: categories,
                    errors: errors.mapped(),
                    old: req.body
                })
            }).catch(err => {
                return res.status(404).send({ message: err });
            })
        }


    },

    //DELETE
    productDelete: (req, res) => {
        db.Product.update({
            alta: 0
        }, {
            where: {
                id: Number(req.params.id)
            }
        })
        res.redirect('/')
    },

    filterByCategory: async (req, res) => {

        let productsByCategoryPromise = db.Product.findAll({
            where: {
                product_category_id: req.params.idCategory
            }
        })

        let categoria = await db.ProductCategory.findOne({
            where: {
                id: req.params.idCategory
            }
        }).catch(err => {
            return res.status(404).send({ message: err });
        })

        Promise.all([categoriesPromise, productsByCategoryPromise])
            .then(function ([categories, products]) {
                res.render("products/allProducts", { similares: products, categoryList: categories, buscado : categoria.name }) //no debería llamarse similares pero bue
            }).catch(err => {
                return res.status(404).send({ message: err });
            })
    },

    busqueda: (req, res) => {

        let productsPromise = db.Product.findAll({ where: { name: { [Op.like]: '%' + req.body.search + '%' } } });

        Promise.all([categoriesPromise, productsPromise]).then(function ([categories, products]) {
            console.log(productsPromise);
            res.render("products/allProducts", { similares: products, categoryList: categories, buscado: req.body.search })
        }).catch(err => {
            return res.status(404).send({ message: err });
        })

    },
}

module.exports = controller;