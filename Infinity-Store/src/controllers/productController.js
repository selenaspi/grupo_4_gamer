const path = require('path');

const controller = {
    mostrarDetalleProducto : (req, res) => {res.sendFile(path.join(__dirname, "../" ,"views", "productDetails.html"))}
}

module.exports = controller;