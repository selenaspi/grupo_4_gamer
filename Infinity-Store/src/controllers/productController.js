const path = require('path');

const controller = {
    mostrarDetalleProducto : (req, res) => {res.render("products/productDetails")},
    crearProducto : (req,res) => {res.render("products/productCreation")}
}

module.exports = controller;