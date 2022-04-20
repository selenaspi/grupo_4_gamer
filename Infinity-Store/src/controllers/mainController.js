const products = require("../database/products.json");
const opinions = require("../database/opinions.json");
const category = require("../database/category.json")

let productsJSON = JSON.stringify(products);
let productsList = JSON.parse(productsJSON);
let opinionsJSON = JSON.stringify(opinions);
let opinionList = JSON.parse(opinionsJSON);
let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);

const controller = {

   index: (req, res) => {

      let categorias = categoryList;
      let aleatorioCategory, randomCategorias =[];

      for (i = 0; i < 6; i++) {
         do {
            aleatorioCategory = Math.floor(Math.random() * categorias.length);
         } while (randomCategorias.indexOf(categorias[aleatorioCategory]) !== -1);
         randomCategorias.push(categorias[aleatorioCategory]);
      } 

      let productsOffSale = productsList.filter(product => { return product.offSale });
      let indexAleatorioOffSale, indexAleatorioRecomendados;
      let productosOfertas = [], popularProducts = [], opinionXProducto = [], productsRecomendados = [];

      for (i = 0; i < 4; i++) {
         do {
            indexAleatorioOffSale = Math.floor(Math.random() * productsOffSale.length);
         } while (productosOfertas.indexOf(productsOffSale[indexAleatorioOffSale]) !== -1);
         productosOfertas.push(productsOffSale[indexAleatorioOffSale]);
      } 

      /**/

      let acumulador = 0;

      for (i = 0; i < productsList.length; i++) {
         opinionList.forEach(opinion => {
            if(opinion.idProduct === i) {
               opinionXProducto.push(opinion);
            }
         });
         opinionXProducto.forEach(opinion => {
            acumulador += opinion.rating;
         });
         if (acumulador / opinionXProducto.length >= 4) {
            for(j = 0; j < productsList.length; j++) {
               if(productsList[j].id === i) {
                  popularProducts.push(productsList[j]);
               }
            }
         }
         acumulador = 0;
         opinionXProducto = []
      }

      for (i = 0; i < 4; i++) {
         do {
            indexAleatorioRecomendados = Math.floor(Math.random() * popularProducts.length);
         } while (productsRecomendados.indexOf(popularProducts[indexAleatorioRecomendados]) !== -1);
         productsRecomendados.push(popularProducts[indexAleatorioRecomendados]);
      }

      res.render('products/index', {randomCategorias, productosOfertas, productsRecomendados, categoryList});
      // res.send(productsRecomendados)
   }
}

module.exports = controller;