const { User } = require("../models");
const { UserService } = require("../services");
const { comparePasswords, createToken } = require("../utils");
module.exports = {
  findAll: (req, res) => {
    User.find()
      .then((respDB) => res.status(200).json(respDB))
      .catch((err) => console.log(err));
  },
  findOne: (req, res) => {
    const { id } = req.params;
    User.findById(id)
      .then((respDB) => res.status(200).json(respDB))
      .catch((err) => console.log(err));
  },
  create: async (req, res) => {
    const { body } = req;
    try {
      const userExists = await UserService.findOneByEmail(body.email);
      if (userExists) res.status(400).json({ message: "Email taken" });
      else {
        const newUser = new User(body);
        const user = await newUser.save();
        res.status(201).json(user);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  updateOne: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const user = await UserService.findOneById(id);
      if (!user) res.status(404).json({ message: "User not found" });
      const modifiedUser = await UserService.updateOne(user, body);
      res.status(200).json(modifiedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  deleteOne: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.findOneById(id);
      if (!user) res.status(404).json({ message: "User not found" });
      await UserService.updateOne(user, { is_active: false });
      res.status(204).json();
    } catch (err) {
      res.status(400).json(err);
    }
  },
  signup: async (req, res) => {
    const { body } = req;
    try {
      const userExists = await UserService.findOneByEmail(body.email);
      if (userExists) res.status(400).json({ message: "Email taken" });
      else {
        const newUser = new User(body);
        const user = await newUser.save();
        user.password = undefined;
        res.status(201).json(user);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.findOneByEmail(email);
      if (!user) res.status(400).json({ message: "Email not valid" });
      const isValid = comparePasswords(password, user.password);
      if (!isValid) res.status(400).json({ message: "Contraseña incorrecta" });
      const token = createToken(user);
      if (!token) res.status(500).json({ message: "error creating token" });
      res.status(200).json({ message: "successful login", token });
    } catch (error) {
      res.status(400).json({ err: "error" });
    }
  },
};
