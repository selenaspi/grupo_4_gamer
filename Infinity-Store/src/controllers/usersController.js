const path = require('path');
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    
    mostrarLogin : (req, res) => {res.render("users/login")},

    mostrarRegistro : (req, res) => {res.render("users/register")},
// Root -- show all users 
index: (req, res) => {
    return res.render("users", {users});
},

// Detail - Detail from one user 

detail : (req,res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    return res.render("detail", {user});
},

// Create - form to create
create : (req,res) =>{
    return res.render("register");
},

// create - method to store
store:(req,res)=>{
    return res.send("Usuario creado");
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