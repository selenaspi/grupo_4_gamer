const db = require('../database/models');
const Op = db.Sequelize.Op

let categoriesPromise = db.ProductCategory.findAll()

const controller = {

    //CREATE
    creation: (req, res) => {
        Promise.all([categoriesPromise]).then(function([categories]){
            res.render("products/productCreationEdition", {
                metodo: "POST",
                ruta: "",
                categoryList : categories
            })
        })
    },

    store: (req, res) => {

        let offSaleOn = req.body.checkDescuento === "on" ? 1 : 0;
        let discountReq = offSaleOn ? req.body.discount : 0;
        
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

    },

    //READ
    productDetails: (req, res) => {
        let productPromise = db.Product.findByPk(Number(req.params.id));

        Promise.all([categoriesPromise, productPromise]).then(function([categories, product]) {
            
            let idSimilarCategory;

            if (product.product_category_id < 6) {
                idSimilarCategory = 6
            } else {
                idSimilarCategory = product.product_category_id;
            }

            db.Product.findAll({
                where: {
                    product_category_id : {[Op.gte] : idSimilarCategory - 5},
                    id: {[Op.ne] : product.id}
                }, limit: 4
            }).then(similares => {
                res.render("products/productDetails", { similares , detalle: product, categoryList: categories })
            })
              
        })
        
    },

    allProducts: (req, res) => {

        let productsPromise = db.Product.findAll();

        Promise.all([categoriesPromise, productsPromise]).then(function([categories, products]) {
            res.render("products/allProducts", { similares: products, categoryList: categories })
        })

    },

    //UPDATE

    edition: (req, res) => {

        let productPromise = db.Product.findByPk(Number(req.params.id))
        
        Promise.all([categoriesPromise, productPromise]).then(function([categories, product]) {
            res.render("products/productCreationEdition", {
                metodo: "PUT",
                ruta: req.params.id + "?_method=PUT",
                producto: product,
                categoryList: categories
            })
        });

    },

    edit: (req, res) => {

        let offSaleOn = req.body.checkDescuento === "on" ? 1 : 0;
        let discountReq = offSaleOn ? req.body.discount : 0;

        if(req.file) {
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

    filterByCategory: (req, res) => {

        let productsByCategoryPromise = db.Product.findAll({
            where: {
                product_category_id: req.params.idCategory
            }
        })

        Promise.all([categoriesPromise, productsByCategoryPromise])
        .then(function([categories, products]) {
            res.render("products/allProducts", { similares: products, categoryList: categories }) //no debería llamarse similares pero bue
        })
    },busqueda: (req, res) => {
        let productsPromise = db.Product.findAll({where:{name : {[Op.like] : '%' + req.body.search + '%'}}});
        
        Promise.all([categoriesPromise, productsPromise]).then(function([categories, products]) {
            console.log(productsPromise);
            res.render("products/allProducts", { similares: products, categoryList: categories })
        })
  
    },
}

module.exports = controller;