const fs = require('fs');
const path = require('path');
const router = require('../routes/users');
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const category = require("../database/category.json")


let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);

const controller = {
    
    mostrarLogin : (req, res) => {res.render("users/login", {categoryList})},
<<<<<<< HEAD



    mostrarRegistro : (req, res) => {res.render("users/register")},

// Root -- show all users 
index: (req, res) => {
    return res.render("users", {users}); 
},
=======

    mostrarRegistro : (req, res) => {res.render("users/register", {categoryList})},
>>>>>>> 38dc2fc51318a14dd8c5fb547c9e6243c7929712


    mostrarRegistro : (req, res) => {res.render("users/register", {categoryList})},


    mostrarRegistro : (req, res) => {res.render("users/register", {categoryList})},


// Detail - Detail from one user 
detail : (req,res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    return res.render("detail", {user});
},

// para crear nuevo usuario
store:(req,res)=>{
<<<<<<< HEAD


    return res.redirect("/users");    


=======
>>>>>>> 38dc2fc51318a14dd8c5fb547c9e6243c7929712
 
     const usuarionuevo = {
        id: users[ users.length -1].id + 1,
         name: req.body.name,
         lastName: req.body.lastName,
         email: req.body.email,
         password: req.body.password,
         role:"user",
         phone:req.body.phoneArea.toString()+req.body.phone.toString(),
         image:req.file.filename
    
     }
     users.push(usuarionuevo);
    fs.writeFileSync(usersFilePath,JSON.stringify(users))
    res.redirect("/");
},

edit: (req,res)=>{
    const id = req.params.id;
    const user = user.find(user => user.id == id);
	return res.render("login ", {user});
},
// Update - Method to update
update: (req, res) => {
    return res.send("Usuario editado");
},

// Delete - Delete one product from DB
destroy : (req, res) => {
    return res.send("Usuario eliminado");
}
};

module.exports = controller;