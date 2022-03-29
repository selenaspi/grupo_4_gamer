const path = require('path');

const controller = {
    mostrarDetalleProducto : (req, res) => {
        let productosSimilares = {
            descripcion :"Productos Similares",
                precio : "$10000",  
        };
        res.render("products/productDetails")},
    crearProducto : (req,res) => {res.render("products/productCreationEdition", {existe : false, name : null, descripcion : null, foto : null, categoria : null, precio : null})},
    editarProducto : (req, res) => {res.render("products/productCreationEdition", {existe : true, name : "Compu gamer", descripcion : "Aquí una descripción del producto", categoria : "teclado", foto : null})}



}


module.exports = controller;

