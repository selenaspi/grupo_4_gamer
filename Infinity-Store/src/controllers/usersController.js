const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    
    mostrarLogin : (req, res) => {res.render("users/login")},

    mostrarRegistro : (req, res) => {res.render("users/register")},
// Root -- show all users 
index: (req, res) => {
    return res.render("users", {users});
},


}

module.exports = controller;