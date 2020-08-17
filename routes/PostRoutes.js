const express = require("express");

const router = express.Router();
const { verifyToken } = require("../middlewares");

const { PostController } = require("../controllers");

router.post("/users/:id/posts", PostController.create);
router.get("/users/:id/posts", PostController.findAll);
router.get("/users/:id/posts/:idPost", PostController.findOne);
router.patch("/users/:id/posts/:idPost", PostController.updateOne);
router.delete("/users/:id/posts/:idPost", PostController.deleteOne);

module.exports = router;
