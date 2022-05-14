const User = require('../models/User.js');

const bcryptjs = require('bcryptjs');

const category = require("../database/category.json")
let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);

const controller = {

    //CREATE

    register: (req, res) => { res.render("users/register", { categoryList }) },

    store: (req, res) => {

        const userData = {
            alta: true,
            role: "user",
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            phone: req.body.phoneArea.toString() + req.body.phone.toString(),
            image: req.file.filename
        }

        User.create(userData)

        res.redirect("/");
    },

    //READ

    profileUser: (req, res) => {
        res.render("users/profileUser", { categoryList, usuarioBuscado: req.session.userLogged })
    },

    //UPDATE

    edition: (req, res) => {
        let usuarioElegido = User.findByPk(Number(req.params.id));

        res.render("users/usersEdition", {
            metodo: "PUT",
            ruta: req.params.id + "?_method=PUT",
            user: usuarioElegido,
            categoryList
        })
    },

    edit: (req, res) => {

        let usuarioToEdit = User.findByPk(Number(req.params.id));

        let usuarioEditado = {
            ...usuarioToEdit,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename
        }

        User.edition(usuarioEditado)

        res.redirect('/');

    },

    //DELETE 

    mostrarBorradoDeUsuario: (req, res) => {

        let usuarioElegido = User.findByPk(Number(req.params.id));

        res.render("users/usersDelete", {
            metodo: "DELETE",
            ruta: req.params.id + "?_method=DELETE",
            user: usuarioElegido,
            categoryList
        })

    },

    deleteUser: (req, res) => {
        User.delete(Number(req.params.id));
        res.redirect("/")
    },

    //LOGIN

    mostrarLogin: (req, res) => {
        res.render("users/login", { categoryList });
    },

    loginProcess: (req, res) => {

        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {

            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin
                return res.redirect('/')
            }

            return res.render('users/login', {
                categoryList,
                errors: {
                    email: {
                        msg: 'Los datos ingresados son incorrectos.'
                    }
                }
            });
        };

        return res.render('users/login', {
            categoryList,
            errors: {
                email: {
                    msg: 'Los datos ingresados son incorrectos. '
                }
            }
        });
    },

    //LOGOUT 

    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/");
    },

    //PRODUCT-CART

    

};

module.exports = controller;