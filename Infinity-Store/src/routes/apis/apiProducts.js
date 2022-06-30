const express = require('express');
const router = express.Router();
const apiUsersController = require('../../controllers/apis/apiProductsController');

router.get('/api/products', apiUsersController.list);
router.get('/api/products/:id', apiUsersController.detail);

module.exports = router;