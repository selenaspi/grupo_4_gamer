const User = require('../database/models/User');
const db = require('../database/models');
const Op = db.Sequelize.Op;

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	if (req.cookies.userEmail) {
		let emailInCookie = req.cookies.userEmail;
		db.User.findOne({
			where: {
				email: emailInCookie
			}
		}).then(function (usuariocookie) {

			if (usuariocookie) {
				req.session.userLogged = usuariocookie;
			}

			if (req.session.userLogged) {
				res.locals.isLogged = true;
				res.locals.userLogged = req.session.userLogged;
			}

			next();
		})

	} else {

		if (req.session.userLogged) {
			res.locals.isLogged = true;
			res.locals.userLogged = req.session.userLogged;
		}

		next();

	}

}

module.exports = userLoggedMiddleware;