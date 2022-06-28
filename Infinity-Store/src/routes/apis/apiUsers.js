const express = require('express');
const router = express.Router();
const apiUsersController = require('../../controllers/apis/apiUsersController');


router.get('/api/users',apiUsersController.list);
router.get('/api/users/detail/:id', apiUsersController.detail);


module.exports = router;