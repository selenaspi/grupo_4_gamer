const db = require('../../database/models');

const apiController = {

    list: async (req, res) => {

        try {

            res.header("Access-Control-Allow-Origin", "*");

            let products = await db.Product.findAll({
                attributes: ['id', 'name', 'description', 'image', 'price'],
                include: [
                    { association: "category" }
                ]
            }).catch(err => {
                return res.status(404).send({ message: err });
            });

            let categories = await db.ProductCategory.findAll()
            .catch(err => {
                return res.status(404).send({ message: err });
            });

            let countByCategory = []


            for (i = 0; i <= categories.length - 1; i++) {
                category_id = categories[i].id
                let acumulador = 0;

                for (let product of products) {
                    if (product.category.id == category_id) {
                        acumulador++
                    }
                }
                countByCategory.push({
                    category_name: categories[i].name,
                    products_count: acumulador
                })

            }

            products.forEach(product => {
                product.dataValues.detail = 'http://localhost:3030/api/products/' + product.dataValues.id
                product.dataValues.relationsOneToMany = [{ category: product.category }]
                delete product.dataValues.category
                product.dataValues.image = 'http://localhost:3030/images/products/' + product.image
            });

            return res.status(200).json({
                count: products.length,
                countByCategory,
                products: products
            })

        } catch (error) {

            return res.status(404).send({ message: "Petición inválida" });

        }
        
    },

    detail: async (req, res) => {

        try {

            res.header("Access-Control-Allow-Origin", "*");

            let product = await db.Product.findByPk(req.params.id, {
                include: [
                    { association: "category" }
                ]
            }).catch(err => {
                return res.status(404).send({ message: err });
            });

            delete product.dataValues.product_category_id;
            product.dataValues.relationsOneToMany = [{ category: product.category }]
            delete product.dataValues.category
            product.dataValues.image = 'http://localhost:3030/images/products/' + product.image

            return res.status(200).json({
                data: product
            })

        } catch (error) {
            return res.status(404).send({ message: "Petición inválida" });
        }

    }
    
}

module.exports = apiController;