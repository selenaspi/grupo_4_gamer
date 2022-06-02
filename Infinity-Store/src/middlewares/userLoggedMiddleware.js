 const User = require('../database/models/User');
const db = require('../database/models');
const Op = db.Sequelize.Op;

 function userLoggedMiddleware(req, res, next) {
 	res.locals.isLogged = false;

 	let emailInCookie = req.cookies.userEmail;
 	let userFromCookie = db.User.findOne({
		where: {
			email : emailInCookie
		}
	}).then(function(usuariocookie){
		if (usuariocookie) {
		req.session.userLogged = usuariocookie;
	}

   if (req.session.userLogged) {
	   res.locals.isLogged = true;
	   res.locals.userLogged = req.session.userLogged;
   }
  
   next();})

 	 
 }

 module.exports = userLoggedMiddleware;