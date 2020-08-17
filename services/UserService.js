const { User } = require("../models");

module.exports = {
  create: (body) => new User(body).save(),
  findOneByEmail: (email) => User.findOne({ email, is_active: true }),
  findOneById: (id) => User.findOne({ _id: id, is_active: true }),
  updateOne: (user, body) => {
    Object.assign(user, body);
    return user.save();
  },
  deleteOneById: (id) => User.findByIdAndDelete(id),
};
