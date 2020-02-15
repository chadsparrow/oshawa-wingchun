const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/routeValidation');

router.route('/login').post(validateBody(schemas.loginSchema), UsersController.login);
router.route('/register').post(validateBody(schemas.loginSchema), UsersController.register);

module.exports = router;
