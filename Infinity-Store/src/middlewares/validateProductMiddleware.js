const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models');

const validator = [
    body('name').notEmpty().withMessage("El producto debe tener un nombre").bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos cinco caracteres'),
    body('description').notEmpty().withMessage("El producto debe tener una descripción").bail()
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('price').notEmpty().withMessage("El producto debe tener un valor").bail(),

    body('image').custom((value, { req }) => {

        if (!req.params.id) {

            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', 'gif'];

            if (!file) {
                throw new Error('El producto debe tener al menos una foto');
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }

        }
        
        return true;

    })

]
module.exports = validator;