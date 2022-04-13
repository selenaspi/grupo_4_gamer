const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    
    mostrarLogin : (req, res) => {res.render("users/login")},

    mostrarRegistro : (req, res) => {res.render("users/register")},

// Detail - Detail from one user 

detail : (req,res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    return res.render("detail", {user});
},

// para crear nuevo usuario
store:(req,res)=>{
 
     const usuarionuevo = {
        id: users[ users.length -1].id + 1,
         name: req.body.name,
         lastName: req.body.lastName,
         email: req.body.email,
         password: req.body.password,
         role:"user",
         phone:req.body.phoneArea.toString()+req.body.phone.toString()
    
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