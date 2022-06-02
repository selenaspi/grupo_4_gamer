// const User = require('../database/models/User.js');

const bcryptjs = require('bcryptjs');

const category = require("../database/category.json")
let categoryJSON = JSON.stringify(category);
let categoryList = JSON.parse(categoryJSON);
const db = require('../database/models');
const { use } = require('../routes/main');
const Op = db.Sequelize.Op
const User = db.User.findAll() ;
let categoriesPromise = db.ProductCategory.findAll();
const controller = {

    //CREATE

    register:function (req,res){
        db.ProductCategory.findAll()
        .then(function(categories){
            return res.render ("users/register",{  categoryList : categories})
        })
    },
    store: function (req,res){
        db.User.create({
            name:req.body.name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:bcryptjs.hashSync(req.body.password, 10),
            phone:req.body.phone,
            image:req.body.image,
            date_of_birth:req.body. date_of_birth,
            home_adress:req.body.home_adress,
            role_id:req.body.role_id,
        })
        res.redirect("/");
    },

    //READ

    profileUser: (req, res) => {
        console.log(req.cookies.userEmail);
        res.render("users/profileUser", { categoryList, usuarioBuscado: req.session.userLogged })
    },

    //UPDATE

    edition: (req, res) => {
        let usuarioElegido = db.User.findByPk(Number(req.params.id));

        res.render("users/usersEdition", {
            metodo: "PUT",
            ruta: req.params.id + "?_method=PUT",
            user: usuarioElegido,
            categoryList
        })
    },

    edit: function (req,res){
        let pedidoUsuario = db.User.findByPk(req.params.id);
    
        let pedidoRoles = db.roles.findAll();
    
        Promise.all([pedidoUsuario,pedidoRoles])
           .then(function([user, roles]){
            res.render("users/usersEdition",{categoryList,users:user, roles:roles})
           })

        res.redirect('/');

    },

    //DELETE 

    mostrarBorradoDeUsuario: (req, res) => {

        let usuarioElegido = User.findByPk(Number(req.params.id));

        res.render("users/usersDelete", {
            metodo: "DELETE",
            ruta: req.params.id + "?_method=DELETE",
            user: usuarioElegido,
            categoryList
        })

    },

    deleteUser: (req, res) => {
        User.delete(Number(req.params.id));
        res.redirect("/")
    },

    //LOGIN

    mostrarLogin: (req, res) => {
        res.cookie('testing', 'Hola Mundo!', {maxAge: 1000 *30});
        res.render("users/login", { categoryList });
    },

    loginProcess: (req, res) => {

        let userToLogin = db.User.findOne({
            where: {
                email : req.body.email
            }
        })
        Promise.all([categoriesPromise, userToLogin])
        .then(function([categories, userToLogin]) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            console.log(isOkThePassword);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                
                if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (10000 * 6000) * 6000 });
				}
                return res.redirect('/');
            }
            
            return res.render('users/login', {
                categoryList,
                errors: {
                    email: {
                        msg: 'Los datos ingresados son incorrectos.'
                    }
                }
            });
            
        })
        },

        // if (userToLogin) {

        //     let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

            //  if (isOkThePassword) {
            //      delete userToLogin.password;
            //      req.session.userLogged = userToLogin;
                
            //      if(req.body.remember_user) {
		 	// 		res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60000000) * 60 });
		 	// 	}
                
            //      return res.redirect('/users/profile');
            //  }

        //      return res.render('users/login', {
        //          categoryList,
        //         errors: {
        //            email: {
        //                msg: 'Los datos ingresados son incorrectos.'
        //            }
        //       }
        //     });
        //  };

    //     return res.render('users/login', {
    //         categoryList,
    //         errors: {
    //             email: {
    //                 msg: 'Los datos ingresados son incorrectos. '
    //             }
    //         }
    //     });
    // },

    //LOGOUT 

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect("/");
    },

    usersList:function(req, res) {   
        let promiseCategory = db.ProductCategory.findAll()                      
      let promiseUsuarios = db.User.findAll()
         Promise.all([promiseCategory,promiseUsuarios]).then(function ([categoryList,users]) {
                res.render("users/usersList", {categoryList,users });
            });
        },
}

module.exports = controller;