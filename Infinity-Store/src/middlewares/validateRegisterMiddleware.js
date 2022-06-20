const User = require('../database/models/User');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const path = require('path');
const { body } = require('express-validator');

const validator = [
	body('name').notEmpty().withMessage("El nombre es obligatorio").isLength({ min: 2 }).withMessage('El nombre debe tener al menos dos caracteres'),
	body('last_name').notEmpty().withMessage("El apellido es obligatorio").isLength({ min: 2 }).withMessage('El apellido debe tener al menos dos caracteres'),
	body('email').notEmpty().withMessage("El email es obligatorio")
		.isEmail().withMessage('Tienes que escribir un correo electrónico válido').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage("La contraseña es obligatoria").isLength({ min: 8 }).withMessage('Tienes que escribir una contraseña de al menos 8 caracteres'),
	body('phone').notEmpty().withMessage('Tienes que colocar tu número de teléfono'),
	body('date_of_birth').notEmpty().withMessage('Tienes que colocar'),
	body('home_adress').notEmpty().withMessage('Tienes que colocar tu dirección'),
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