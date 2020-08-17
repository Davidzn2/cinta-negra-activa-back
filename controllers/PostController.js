const { UserService, PostService } = require("../services");

module.exports = {
  create: async (req, res) => {
    const { idUser } = req.params;
    const { body } = req;
    try {
      // 1) Traernos el usuario
      const user = await UserService.findOneById(idUser);

      // 2) Crear el objeto de posts
      const post = await PostService.create(body);

      // 3) Agregar el nuevo post al usuario y salvar el usuario
      const userWithPost = await PostService.addPostToUser(post, user);

      // 4) Responder al cliente con el usuario con el nuevo post
      res.status(201).json(userWithPost);
    } catch (error) {
      res.status(400).json({ message: "Error adding post to user", error });
    }
  },
  findAll: async (req, res) => {
    const { idUser } = req.params;
    try {
      // 1) Traemos el usuario
      const user = await UserService.findOneById(idUser);

      // 2) Sacamos los posts del objeto de usuario
      const posts = await PostService.getPostsInUser(user);

      // 3) Responder al cliente con los posts del usuario
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ message: "Error getting user posts", error });
    }
  },
  findOne: async (req, res) => {
    const { idUser, idPost } = req.params;
    try {
      // 1) Traemos el usuario
      const user = await UserService.findOneById(idUser);

      // 2) Sacamos el post deseado del objeto de usuario
      const post = PostService.findOneByIdInUser(idPost, user);
      if (!post) res.status(404).json({ message: "Post not found" });

      // 3) Responder al cliente con el post deseado del usuario
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ message: "Error getting user post by id", error });
    }
  },
  updateOne: async (req, res) => {
    const { idUser, idPost } = req.params;
    const { body } = req;
    try {
      // 1) Traemos el usuario
      const user = await UserService.findOneById(idUser);
      if (!user) res.status(404).json({ message: "User not found" });

      // 2) Sacamos el post deseado del objeto de usuario
      const post = PostService.findOneByIdInUser(idPost, user);
      if (!post) res.status(404).json({ message: "Post not found" });

      // 3) Actualizamos el post del usuario
      const updatedUser = await PostService.updateOneByIdInUser(
        idPost,
        user,
        body
      );

      // 4) Responder al cliente con el post modificado
      res.status(200).json(updatedUser.posts.id(idPost));
    } catch (error) {
      res.status(400).json({ message: "Error getting user post by id", error });
    }
  },
  deleteOne: async (req, res) => {
    const { idUser, idPost } = req.params;
    try {
      // 1) Traemos el usuario
      const user = await UserService.findOneById(idUser);
      if (!user) res.status(404).json({ message: "User not found" });

      // 2) Sacamos el post deseado del objeto de usuario
      const post = PostService.findOneByIdInUser(idPost, user);
      if (!post) res.status(404).json({ message: "Post not found" });

      // 3) Actualizamos el post del usuario
      await PostService.updateOneByIdInUser(idPost, user, { is_active: false });

      // 4) Responder al cliente con el post modificado
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ message: "Error getting user post by id", error });
    }
  },
};
