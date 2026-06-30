import { postService } from "../services/postService.js";

export const postController = {
  // Cria um post para o usuario autenticado. O controller envia os dados do corpo
  // e o req.userId ao service, que completa campos como data, hora e autor.
  async create(req, res, next) {
    try {
      const post = await postService.createPost(req.body, req.userId);
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  },

  // Remove um post pelo id da URL. A verificacao de permissao fica no service:
  // somente quem criou o post pode deleta-lo.
  async delete(req, res, next) {
    try {
      await postService.deletePost(req.params.id, req.userId);
      res.status(200).json({ success: true, message: "Post deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  },

  // Lista somente os posts criados pelo usuario logado. O id vem do token ja
  // validado e guardado em req.userId pelo middleware de autenticacao.
  async getByUser(req, res, next) {
    try {
      const posts = await postService.getPostsByUser(req.userId);
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  },

  // Lista os posts que o usuario pode enxergar. A regra combina posts publicos,
  // posts do proprio usuario e posts privados criados pelos amigos dele.
  async list(req, res, next) {
    try {
      const posts = await postService.getVisiblePosts(req.userId);
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  },
};
