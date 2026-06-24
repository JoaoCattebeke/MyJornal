// src/repositories/userRepository.js
import { User } from "../models/user.js";

export const userRepository = {
  // Consulta todos os usuarios diretamente no MongoDB. Repository nao aplica regra
  // de negocio; sua funcao e apenas encapsular como o model User acessa o banco.
  async findAll() {
    return User.find();
  },

  // Procura um usuario pelo _id do MongoDB. Retorna o documento encontrado ou null
  // caso nenhum registro tenha esse identificador.
  async findById(id) {
    return User.findById(id);
  },

  // Procura um usuario pelo email. O select("+password") e necessario porque o
  // schema marca password com select: false, escondendo a senha nas consultas comuns.
  async findByEmail(email) {
    return User.findOne({ email }).select("+password");
  },

  // Cria e salva um novo documento de usuario usando as validacoes definidas no schema.
  async create(data) {
    return User.create(data);
  },

  // Atualiza um usuario pelo id. new: true faz a funcao retornar o documento ja
  // atualizado, e runValidators: true reaplica as validacoes do schema na edicao.
  async update(id, data) {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  // Remove um usuario pelo id e retorna o documento removido, se ele existia.
  async delete(id) {
    return User.findByIdAndDelete(id);
  },

  // Lista possiveis amigos. Primeiro busca o usuario atual para conhecer suas listas
  // de friends, solicitacao e aprovacao. Depois monta excludeIds com ele mesmo,
  // amigos atuais e pedidos pendentes. O $nin significa "not in", ou seja, retorna
  // usuarios cujo _id nao esta nessa lista.
  async findAvailableFriends(userId) {
    const user = await User.findById(userId);
    const excludeIds = [
      userId,
      ...(user?.friends || []),
      ...(user?.solicitacao || []),
      ...(user?.aprovacao || []),
    ];
    return User.find({ _id: { $nin: excludeIds } });
  },

  // Cria amizade direta adicionando friendId em friends. Hoje fica util para seeds
  // e rotinas internas; o endpoint add_friend usa solicitacao/aprovacao.
  async addFriend(userId, friendId) {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true },
    );
  },

  // Adiciona friendId na lista de solicitacao do usuario que enviou o convite.
  // O $addToSet evita gravar o mesmo pedido mais de uma vez.
  async addSolicitacao(userId, friendId) {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { solicitacao: friendId } },
      { new: true },
    );
  },

  // Adiciona userId na lista de aprovacao do usuario que recebeu o convite.
  // Essa lista representa pedidos recebidos que ainda aguardam resposta.
  async addAprovacao(userId, friendId) {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { aprovacao: friendId } },
      { new: true },
    );
  },

  // Busca o usuario e preenche a lista de solicitacoes enviadas com nome e email.
  async getSolicitacao(userId) {
    return User.findById(userId).populate("solicitacao", "name email");
  },

  // Busca o usuario e preenche a lista de aprovacoes pendentes com nome e email.
  async getAprovacao(userId) {
    return User.findById(userId).populate("aprovacao", "name email");
  },

  // Aceita uma amizade atualizando os dois usuarios: quem aprova ganha o friendId
  // em friends e remove esse id de aprovacao; quem solicitou remove o usuario
  // logado de solicitacao e tambem ganha o usuario logado em friends.
  async approveFriendship(userId, friendId) {
    const [user, friend] = await Promise.all([
      User.findByIdAndUpdate(
        userId,
        {
          $pull: { aprovacao: friendId },
          $addToSet: { friends: friendId },
        },
        { new: true },
      ),
      User.findByIdAndUpdate(
        friendId,
        {
          $pull: { solicitacao: userId },
          $addToSet: { friends: userId },
        },
        { new: true },
      ),
    ]);

    return { user, friend };
  },

  // Reprova uma amizade removendo o pedido pendente dos dois lados sem adicionar
  // ninguem em friends.
  async rejectFriendship(userId, friendId) {
    const [user, friend] = await Promise.all([
      User.findByIdAndUpdate(
        userId,
        { $pull: { aprovacao: friendId } },
        { new: true },
      ),
      User.findByIdAndUpdate(
        friendId,
        { $pull: { solicitacao: userId } },
        { new: true },
      ),
    ]);

    return { user, friend };
  },

  // Busca o usuario e usa populate para trocar os ids em friends por documentos
  // resumidos dos amigos, trazendo apenas name e email.
  async getFriends(userId) {
    return User.findById(userId).populate("friends", "name email");
  },
};
