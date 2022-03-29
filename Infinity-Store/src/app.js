const express = require('express');
const path = require ('path');
const app = express(); 

app.set("view engine", "ejs");
app.set('views', './src/views');

const mainRouter = require('./routes/main');
const productCartRouter = require('./routes/productCart');
const productRouter = require('./routes/product');
const usersRouter = require ('./routes/users');

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3030;

app.use(express.static(publicPath));

app.listen( port, () => console.log("Servidor corriendo en el puerto " + port));

app.use("/", mainRouter);
app.use("/productCart", productCartRouter);
app.use("/product", productRouter);
app.use("/users",usersRouter);

