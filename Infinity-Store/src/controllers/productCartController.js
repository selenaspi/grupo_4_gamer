const path = require("path");

const controller = {
    mostrarCarrito : (req, res) => {res.render("products/productCart.ejs")}
}

module.exports = controller;