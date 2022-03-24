const path = require('path');

const controller = {
    mostrarRegistro : (req, res) => {res.render("users/register.ejs")}
}

module.exports = controller;