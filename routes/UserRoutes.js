const express = require("express");
const router = express.Router();

const { UserController } = require('../controllers')
const { UserValidator } = require('../validators')

router.get('/users', UserController.findAll);
router.get('/users/:id', UserController.findOne)
router.post('/users', UserValidator.create, UserController.create);

module.exports = router;
