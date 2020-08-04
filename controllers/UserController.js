const { User } = require("../models");

module.exports = {
  findAll: (req, res) => {
    User.find()
      .then((respDB) => res.status(200).json(respDB))
      .catch((err) => console.log(err));
  },
  findOne: (req, res) => {
    const {id} = req.params
    User.findById(id)
      .then((respDB) => res.status(200).json(respDB))
      .catch((err) => console.log(err));
  },
  create: (req, res) => {
    const { body } = req;
    const newUser = new User(body);
    newUser
      .save()
      .then((respDB) => res.status(201).json(respDB))
      .catch((err) => console.log(err));
  },
};
