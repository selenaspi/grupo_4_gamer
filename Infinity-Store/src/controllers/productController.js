const path = require('path');

const controller = {
    mostrarDetalleProducto : (req, res) => {res.render("products/productDetails")}
}

module.exports = controller;