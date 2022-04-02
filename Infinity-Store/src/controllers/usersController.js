const path = require('path');

const controller = {
    mostrarLogin : (req, res) => {res.render("users/login")},

    mostrarRegistro : (req, res) => {res.render("users/register")}
}

module.exports = controller;