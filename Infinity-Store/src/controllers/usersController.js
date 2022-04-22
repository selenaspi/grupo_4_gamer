const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const category = require("../database/category.json")


let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);

let usersActivos = users.filter(usuario => usuario.alta);

const controller = {
    mostrarProfileUser: (req, res) => { res.render("users/profileUser", { categoryList }) },

    mostrarInfoUser: (req, res) => { res.render("users/infoUser", { categoryList }) },

    mostrarLogin: (req, res) => { res.render("users/login", { categoryList }) },

    mostrarRegistro: (req, res) => { res.render("users/register", { categoryList }) },

    // Detail - Detail from one user 
    detail: (req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        return res.render("detail", { user });
    },

    // para crear nuevo usuario
    store: (req, res) => {
        const usuarionuevo = {
            id: users[users.length - 1].id + 1,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: "user",
            phone: req.body.phoneArea.toString() + req.body.phone.toString(),
            image: req.file.filename
        }
        users.push(usuarionuevo);
        fs.writeFileSync(usersFilePath, JSON.stringify(users))
        res.redirect("/");
    },
    edit: (req, res) => {
        const id = req.params.id;
        const user = user.find(user => user.id == id);
        return res.render("login ", { user }),

            users = users.map(user => {

                if (user.id == req.params.id) {
                    user = {
                        id: users[users.length - 1].id + 1,
                        name: req.body.name,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        role: "user",
                        phone: req.body.phoneArea.toString() + req.body.phone.toString(),
                        image: req.file.filename
                    }
                }
                return user;
            }),

            fs.writeFileSync(usersfilePath, JSON.stringify(users)),

            res.redirect('/');

    },
    allUsers: (req, res) => {

        res.render("users/profileUser", { similares: usersActivos, categoryList });
    },
    userDelete: (req, res) => {
        const id = req.params.id;
        users = users.map(user => {
            if (user.id == req, params.id) {
                user = {
                    id: users[users.length - 1].id + 1,
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    role: "user",
                    phone: req.body.phoneArea.toString() + req.body.phone.toString(),
                    image: req.file.filename
                }
            }
            console.log(user);
            return user;

        }),
            fs.writeFileSync(usersfilePath, JSON.stringify(users));
        res.redirect('/')
    }
};


module.exports = controller;