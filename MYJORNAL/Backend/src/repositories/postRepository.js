// src/repositories/postRepository.js
import { Post } from "../models/post.js";

export const postRepository = {
  // Cria um documento de post no MongoDB. O repository recebe os dados ja prontos
  // do service e deixa o Mongoose aplicar as validacoes do schema.
  async create(data) {
    return Post.create(data);
  },

  // Busca um post pelo id. O populate em createdBy substitui o id do autor por
  // dados basicos do usuario, deixando a resposta mais facil de consumir.
  async findById(id) {
    return Post.findById(id).populate("createdBy", "name email");
  },

  // Remove um post pelo id. A permissao para deletar ja deve ter sido verificada
  // antes, no service; aqui fica somente a operacao de banco.
  async deleteById(id) {
    return Post.findByIdAndDelete(id);
  },

  // Busca posts cujo createdBy e o usuario informado. Depois inclui dados do autor
  // com populate e ordena por createdAt decrescente para mostrar os mais novos primeiro.
  async findByUser(userId) {
    return Post.find({ createdBy: userId })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
  },

  // Busca todos os posts visiveis para o usuario. O $or representa alternativas:
  // post publico, post criado pelo proprio usuario ou post privado criado por amigos.
  // Depois a consulta tambem preenche o autor e ordena do mais recente ao mais antigo.
  async findVisiblePosts(userId, friendIds) {
    return Post.find({
      $or: [
        { isPublic: true },
        { createdBy: userId },
        { createdBy: { $in: friendIds }, isPublic: false },
      ],
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
  },
};
