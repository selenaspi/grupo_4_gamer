const db = require('../database/models');
const Op = db.Sequelize.Op

const controller = {

   index: (req, res) => {

      let randomIndexOffSale, discountedProducts = [], randomIndexCategory, randomCategories = [], productReviews = [], indexsPopularProducts = [], randomPopularProducts = [],  randomIndexPopularProducts;

      //Promesa de poductos activos en oferta

      let productsPromise = db.Product.findAll({
         where: {
            off_sale: 1,
            alta: 1
         }
      })

      //Promesa de productos activos

      let activeProductsPromise = db.Product.findAll({
         where: {
            alta: 1
         }
      })

      //Promesa de categorías

      let categoriesPromise = db.ProductCategory.findAll()

      //Promesa de opiniones activas

      let activeOpinionsPromise = db.Opinion.findAll({
         where: {
            alta: 1
         }
      })

      //Resolución de promesas

      Promise.all([productsPromise, categoriesPromise, activeProductsPromise, activeOpinionsPromise])
         .then(function ([products_off_sale, categories, products, opinions]) {

            //Buscar los índices de manera random de aquellos productos en oferta

            while (discountedProducts.length < 4) {

               do {
                  randomIndexOffSale = Math.floor(Math.random() * 100);
               } while (!(products_off_sale.find(elemento => elemento.id == randomIndexOffSale)));

               if (discountedProducts.indexOf(randomIndexOffSale) == -1) {
                  discountedProducts.push(randomIndexOffSale);
               }

            }

            //Random categorías 

            for (i = 0; i < 6; i++) {

               do {
                  randomIndexCategory = Math.floor(Math.random() * categories.length);
               } while (randomCategories.find(elemento => elemento == randomIndexCategory) || randomIndexCategory == 0);

               randomCategories.push(randomIndexCategory);

            }

            //Encontrar índices de productos indexsPopularProductslares

            let acumulador = 0;

            for (i = 0; i <= products.length; i++) {

               opinions.forEach(opinion => {
                  if (opinion.product_id == (i + 1)) {
                     productReviews.push(opinion);
                  }
               });

               productReviews.forEach(opinion => {
                  acumulador += opinion.rating;
               });

               if (productReviews.length != 0) {
                  if (acumulador / productReviews.length >= 4) {
                     indexsPopularProducts.push(i + 1);
                  }
               }

               acumulador = 0;
               productReviews = []
            }

            while (randomPopularProducts.length < 4) {

               do {
                  randomIndexPopularProducts = Math.floor(Math.random() * 100);
               } while ((indexsPopularProducts.indexOf(randomIndexPopularProducts) == -1));

               if (randomPopularProducts.indexOf(randomIndexPopularProducts) == -1) {
                  randomPopularProducts.push(randomIndexPopularProducts);
               }

            }

            let randomCategoriesPromise = db.ProductCategory.findAll({
               where: {
                  id: { [Op.in]: randomCategories }
               }
            })

            let randomDiscountedProductsPromise = db.Product.findAll({
               where: {
                  id: { [Op.in]: discountedProducts }
               }
            })

            let randomPopularProductsPromise = db.Product.findAll({
               where: {
                  id: { [Op.in]: randomPopularProducts }
               }
            })

            Promise.all([randomDiscountedProductsPromise, randomCategoriesPromise, randomPopularProductsPromise])
               .then(function ([randomDiscountedProducts, randomCategories, randomPopularProducts]) {
                  res.render('products/index', { categoryList: categories, randomCategorias: randomCategories, productosOfertas: randomDiscountedProducts, productsRecomendados: randomPopularProducts });
               })

         })

   },

   armarPc: (req, res) => {
      return res.render("generales/no-found");
   }
}

module.exports = controller;