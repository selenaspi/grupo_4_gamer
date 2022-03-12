const express = require('express');
const path = require ('path');
const port = 3030;
const app = express(); 

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.listen( port, () => console.log("Servidor corriendo en el puerto " + port));

app.get("/productCart", (req, res) => {res.sendFile(path.join(__dirname, "views", "productCart.html"))});
<<<<<<< HEAD



=======
>>>>>>> cfb790e270ca9646672211a4a70e9450ba2312eb
app.get("/login", (req, res) => {res.sendFile(path.join(__dirname, "views", "login.html"))})
app.get("/register", (req, res) => {res.sendFile(path.join(__dirname, "views", "register.html"))})
app.get("/productDetails", (req, res) => {res.sendFile(path.join(__dirname, "views", "productDetails.html"))})
<<<<<<< HEAD


app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "views", "index.html"))})

app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "views", "index.html"))})

=======
app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "views", "index.html"))})
>>>>>>> cfb790e270ca9646672211a4a70e9450ba2312eb
