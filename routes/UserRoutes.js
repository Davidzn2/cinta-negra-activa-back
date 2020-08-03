const express = require("express");

const router = express.Router();

const { User } = require("../models");

router.get('/users', (req, res) => {
  User.find()
    .then((respDB) => res.status(200).json(respDB))
    .catch((err) => console.log(err));
});
router.post('/users', (req, res) => {
  const { body } = req;
  const newUser = new User(body);
  newUser.save()
    .then((respDB) => res.status(201).json(respDB))
    .catch((err) => console.log(err));
});

module.exports = router;
