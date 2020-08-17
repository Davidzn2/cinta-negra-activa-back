const express = require("express");
const router = express.Router();

const { UserController } = require("../controllers");
const { UserValidator } = require("../validators");
const { verifyToken } = require("../middlewares");

router.get("/users", verifyToken, UserController.findAll);
router.get("/users/:id", UserController.findOne);
router.post("/users",verifyToken, UserValidator.create, UserController.create);
router.patch("/users/:id", verifyToken, UserController.updateOne);
router.delete("/users/:id", verifyToken,  UserController.deleteOne);
module.exports = router;
