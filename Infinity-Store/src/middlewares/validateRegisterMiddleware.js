const User = require('../database/models/User');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const path = require('path');
const { body } = require('express-validator');

const validator = [
	body('name').notEmpty().withMessage("El nombre es obligatorio").isLength({ min: 2 }).withMessage('El nombre debe tener al menos dos caracteres'),
	body('last_name').notEmpty().withMessage("El apellido es obligatorio").isLength({ min: 2 }).withMessage('El apellido debe tener al menos dos caracteres'),
	body('email').notEmpty().withMessage("El email es obligatorio").bail()
	.isEmail().withMessage('Debes escribir un formato de correo válido').bail()
	.custom((value, { req }) => {
			return db.User.findOne({
				where: {
					email: req.body.email
				}
			}).then(usuario => {
				if (usuario) {
					throw new Error('El usuario ya se encuentra registrado');
				}
			})
		
		}),
	body('password').notEmpty().withMessage("La contraseña es obligatoria").isLength({ min: 8 }).withMessage('Tienes que escribir una contraseña de al menos 8 caracteres'),
	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen de formato JPG, JPEG, PNG, GIF');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]
module.exports = validator;