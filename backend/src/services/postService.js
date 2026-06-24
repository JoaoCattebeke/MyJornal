import { postRepository } from "../repositories/postRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import { AppError } from "../errors/AppError.js";

export const postService = {
  // Cria um post. O cliente envia titulo, descricao e visibilidade; o service
  // acrescenta data, hora e createdBy para garantir que esses campos venham do
  // servidor e do usuario autenticado, nao de dados manipulados pelo cliente.
  async createPost(data, userId) {
    const now = new Date();
    const creationDate = now.toISOString().split("T")[0];
    const creationTime = now.toTimeString().split(" ")[0];



    return postRepository.create({
      ...data,
      creationDate,
      creationTime,
      createdBy: userId,
    });
  },

  // Remove um post com regra de permissao. Primeiro busca o post, depois confere
  // se existe e se o createdBy e igual ao usuario logado. So depois disso chama
  // o repository para apagar no banco.
  async deletePost(postId, userId) {
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new AppError("Post não encontrado", 404);
    }

    if (post.createdBy._id.toString() !== userId) {
      throw new AppError(
        "Você só pode deletar posts criados por você",
        403,
      );
    }

    return postRepository.deleteById(postId);
  },

  // Busca os posts de um usuario. Esta funcao nao mistura regras de visibilidade:
  // ela retorna apenas posts cujo campo createdBy corresponde ao userId recebido.
  async getPostsByUser(userId) {
    return postRepository.findByUser(userId);
  },

  // Monta a lista de posts visiveis. Primeiro carrega os amigos do usuario, extrai
  // os ids deles e pede ao repository uma consulta com tres grupos: publicos,
  // proprios e privados de amigos.
  async getVisiblePosts(userId) {
    const user = await userRepository.getFriends(userId);

    // Converte a lista de amigos populados em uma lista simples de ids em texto,
    // porque a consulta de posts precisa comparar createdBy com esses ids.
    const friendIds = user?.friends?.map((f) => f._id.toString()) || [];

    return postRepository.findVisiblePosts(userId, friendIds);
  },
};
