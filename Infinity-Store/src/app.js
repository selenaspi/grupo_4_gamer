const express = require('express');
const path = require ('path');
const port = 3030;
const app = express(); 

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.listen( port, () => console.log("Servidor corriendo en el puerto " + port));

app.get("/productCart", (req, res) => {res.sendFile(path.join(__dirname, "views", "productCart.html"))});


app.get("/productDetails", (req, res) => {res.sendFile(path.join(__dirname, "views", "productDetails.html"))})

app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "views", "index.html"))})


