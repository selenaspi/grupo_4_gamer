const usuarios = require("../database/users.json");
const category = require("../database/category.json")
const fs = require('fs');
const path = require('path');
const usersfilePath = path.join(__dirname, '../database/users.json');
let users = JSON.parse(fs.readFileSync(usersfilePath, 'utf-8'));
const bcryptjs = require('bcryptjs');

let usersJSON= JSON.stringify(users);
let usersList = JSON.parse(usersJSON);
let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON); 

let usersActivos = users.filter(user => user.alta);

const controller = {

    mostrarProfileUser: (req, res) => { 
        
            let idUsuario = Number(req.params.id);
            let listaUsers = [usersActivos[idUsuario], usersActivos[idUsuario + 1], usersActivos[idUsuario + 2], usersActivos[idUsuario + 3]];
    
            res.render("users/profileUser", { userSimil: listaUsers, detalleUs: usersActivos[idUsuario - 1], categoryList, usuariosList })
        },

    mostrarInfoUser: (req, res) => { res.render("users/infoUser",{categoryList} ) },

    mostrarLogin: (req, res) => { res.render("users/login",{categoryList} )},

    mostrarRegistro: (req, res) => { res.render("users/register",{categoryList} ) },

    // Detail - Detail from one user 
    detail: (req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        return res.render("detail", { user });
    },

    // para crear nuevo usuario
    store: (req, res) => {
        const usuarioNuevo = {
            id: users[users.length - 1].id + 1,
            name: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync (req.body.password,10),
            role: "user",
            phone: req.body.phoneArea.toString() + req.body.phone.toString(),
            image: req.file.filename
        }
        users.push(usuarioNuevo);
        fs.writefileSync(usersFilePath, JSON.stringify(users))
        res.redirect("/");
    },
        //--------------------------------------------------------------------//  muestra bien el formulario de edicion
        mostrarformulariodeedicion: (req, res) => {
            idQuery = Number(req.params.id);
            let usuarioElegido;
    
            usersList.forEach(user => {
                if (user.id === idQuery) {
                    usuarioElegido = user
                }
            });
    
           
            res.render("users/usersEdition", {
                metodo: "PUT",
                ruta: req.params.id + "?_method=PUT",
                user: usuarioElegido,
                categoryList
            })
        },
    //-------------------------------------------------------------------// edita usuarios
        edit: (req, res) => {
            
            
                users = users.map(user => {
    
                    if (user.id == req.params.id) {
                        user = {
                            id: Number(req.params.id),
                            name: req.body.name,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password:  bcryptjs.hashSync (req.body.password,10),
                            phone: req.body.phone,
                            image: req.file.filename
                        }
                    }
                    return user;
                }),
    
                fs.writeFileSync(usersfilePath, JSON.stringify(users)),
    
                res.redirect('/');
    
        },
        
    allUsers: (req, res) => {

        res.render("users/profileUser", { userSimil: usersActivos, categoryList});
    },
    userDelete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.usersFilePath, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
};


module.exports = controller;