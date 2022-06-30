const express = require('express');
const app = express(); 
const port = process.env.PORT || 3030;
app.listen(port, () => console.log("Servidor corriendo en el puerto " + port));

const path = require ('path');

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set('views', './src/views');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const session = require('express-session');
app.use(session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: false,
}))

const cookies = require('cookie-parser');
app.use(cookies()); 

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
 app.use(userLoggedMiddleware);

const mainRouter = require('./routes/main');
const productCartRouter = require('./routes/productCart');
const productRouter = require('./routes/product');
const usersRouter = require ('./routes/users');

//rutas para apis
const apiUsersRoutes = require('./routes/apis/apiUsers');
const apiProductRouter = require('./routes/apis/apiProducts');

app.use("/", mainRouter);
app.use("/productCart", productCartRouter);
app.use("/product", productRouter);
app.use("/users",usersRouter);

app.use(apiUsersRoutes);
app.use(apiProductRouter);