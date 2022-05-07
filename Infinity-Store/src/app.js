const express = require('express');
const path = require ('path');
const app = express(); 
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set('views', './src/views');

const mainRouter = require('./routes/main');
const productCartRouter = require('./routes/productCart');
const productRouter = require('./routes/product');
const usersRouter = require ('./routes/users');

const session = require('express-session');

app.use(session({
    secret: "Shhh, Its a secret",
    resave: false,
    saveUninitialized: false,
}))

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3030;

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.listen(port, () => console.log("Servidor corriendo en el puerto " + port));

app.use("/", mainRouter);
app.use("/productCart", productCartRouter);
app.use("/product", productRouter);
app.use("/users",usersRouter);