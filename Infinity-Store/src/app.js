const express = require('express');
const path = require ('path');
const app = express(); 
app.set("views engine", "ejs");
const mainRouter = require('./routes/main');
const productCartRouter = require('./routes/productCart');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const productRouter = require('./routes/product');

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3030;

app.use(express.static(publicPath));

app.listen( port, () => console.log("Servidor corriendo en el puerto " + port));

app.use("/", mainRouter);
app.use("/productCart", productCartRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/product", productRouter)