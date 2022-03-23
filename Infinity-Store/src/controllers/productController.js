const path = require('path');

const controller = {
    mostrarDetalleProducto : (req, res) => {res.render( "productDetails.ejs")}
}

module.exports = controller;