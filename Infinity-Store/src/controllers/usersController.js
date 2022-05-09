const User = require('../models/User.js');

const bcryptjs = require('bcryptjs');

const category = require("../database/category.json")
let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);

const fs = require('fs');
const path = require('path');
const usersfilePath = path.join(__dirname, '../database/users.json');
let users = JSON.parse(fs.readFileSync(usersfilePath, 'utf-8'));



let usersActivos = users.filter(user => user.alta);

const controller = {

    //CREATE
    register: (req, res) => { res.render("users/register", { categoryList }) },

    mostrarInfoUser: (req, res) => { res.render("users/infoUser",{categoryList} ) },

    mostrarLogin: (req, res) => { 
        res.render("users/login",{categoryList});
    },

//  ----------------------------------------------------------PROCESO DE LOGIN----------------------------------------------------------------------
    loginProcess:(req,res) => {
        let userToLogin = User.findByField('email', req.body.email);
        if(userToLogin){
             let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if(isOkThePassword){
                 delete userToLogin.password;
                 req.session.userLogged = userToLogin
                 return res.redirect('/')
            }
            return res.render('users/login', {categoryList,
                errors: {
                        email: {
                            msg: 'Las credenciales son inválidas'
                        }
                }
            });
        };

        return res.render('users/login', {categoryList,
        errors: {
                email: {
                    msg: 'Los datos ingresados son incorrectos. '
                }
        }
    });
    }
,
// -----------------------------------------------------------------------------------------------------------------------------------------
    mostrarRegistro: (req, res) => { res.render("users/register",{categoryList} ) },

    // Detail - Detail from one user 
    detail: (req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        return res.render("detail", { user });
    },

    // para crear nuevo usuario
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

        // let idUsuario = Number(req.params.id);
        // let listaUsers = [usersActivos[idUsuario], usersActivos[idUsuario + 1], usersActivos[idUsuario + 2], usersActivos[idUsuario + 3]];

        res.render("users/profileUser", { categoryList })
        // res.render("users/profileUser", { userSimil: listaUsers, detalleUs: usersActivos[idUsuario - 1], categoryList })
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
            name : req.body.name,
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

        res.render("users/userDelete", {
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






    

    mostrarLogin: (req, res) => { res.render("users/login", { categoryList }) },

    allUsers: (req, res) => {

        res.render("users/profileUser", { userSimil: usersActivos, categoryList });
    },

};

module.exports = controller;