const bcrypt = require("bcrypt");

module.exports = {
  comparePasswords: (passwordReq, passwordHashed) => {
      return bcrypt.compareSync(passwordReq, passwordHashed)
  },
};
