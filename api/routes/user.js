const express = require('express');
const router = express.Router();

const UsersController = require('../controller/users');

router.post('/signup', UsersController.users_sign_up);

router.post('/login', UsersController.users_login);

router.delete('/:userId', UsersController.users_delete);

module.exports = router;