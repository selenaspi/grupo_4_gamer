const path = require('path');

const controller = {
    mostrarLogin : (req, res) => {res.render("users/login.ejs")}
}

module.exports = controller;