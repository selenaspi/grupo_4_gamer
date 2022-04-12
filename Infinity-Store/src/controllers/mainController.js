const products = require("../database/products.json");
const opinions = require("../database/opinions.json");

let productsJSON = JSON.stringify(products);
let productsList = JSON.parse(productsJSON);
let opinionsJSON = JSON.stringify(opinions);
let opinionList = JSON.parse(opinionsJSON);

const controller = {

   index: (req, res) => {

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
         opinionXProducto = opinionList.filter(opinion => {
            return opinion.idProduct === 5;
         });
         opinionXProducto.forEach(opinion => {
            acumulador += opinion.rating;
         });
         if (acumulador / opinionXProducto.length >= 4) {
            popularProducts.push(productsList[i]);
         }
      }

      for (i = 0; i < 4; i++) {
         do {
            indexAleatorioRecomendados = Math.floor(Math.random() * popularProducts.length);
         } while (productsRecomendados.indexOf(popularProducts[indexAleatorioRecomendados]) !== -1);
         productsRecomendados.push(popularProducts[indexAleatorioRecomendados]);
      }

      res.render('products/index', { productosOfertas, productsRecomendados });
   }
}

module.exports = controller;