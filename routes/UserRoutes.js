const express = require("express");
const router = express.Router();

const { UserController } = require('../controllers')
const { UserValidator } = require('../validators')
const { verifyToken } = require('../middlewares')

router.get('/users', verifyToken, UserController.findAll);
router.get('/users/:id', UserController.findOne)
router.post('/users', UserValidator.create, UserController.create);

module.exports = router;
