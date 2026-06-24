import { userRepository } from '../repositories/userRepository.js';
import bcrypt from 'bcryptjs';
import { AppError } from '../errors/AppError.js';

const hasId = (list, id) => list?.some((item) => item.toString() === id);

export const userService = {
  // Busca todos os usuarios. Como nao ha regra extra aqui, o service apenas
  // repassa a chamada ao repository, que conversa diretamente com o banco.
  async getAllUsers() {
    return userRepository.findAll();
  },

  // Busca um usuario pelo id. Depois da consulta, verifica se o retorno veio vazio;
  // isso transforma "nao achei no banco" em erro claro para quem chamou a funcao.
  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('Usuario nao encontrado');
    }
    return user;
  },

  // Cria um usuario novo. Primeiro garante que o email ainda nao existe, depois
  // criptografa a senha com bcrypt antes de salvar, para nunca gravar senha pura.
  async createUser(data) {
    const exists = await userRepository.findByEmail(data.email);
    if (exists) {
      throw new Error('Email ja cadastrado');
    }
    const hashed = await bcrypt.hash(data.password, 10);
    return userRepository.create({
      ...data,
      password: hashed,
    });
  },

  // Lista possiveis amigos. A funcao delega ao repository a consulta que exclui
  // o proprio usuario, amigos atuais e usuarios que ja estao em pedidos pendentes.
  async getAvailableFriends(userId) {
    return userRepository.findAvailableFriends(userId);
  },

  // Envia um pedido de amizade. O usuario logado guarda o friendId em solicitacao,
  // indicando que ele enviou o convite; o usuario convidado guarda o userId em
  // aprovacao, indicando que existe um pedido aguardando resposta dele.
  async addFriend(userId, friendId) {
    if (userId === friendId) {
      throw new AppError('Nao e possivel adicionar a si mesmo como amigo', 400);
    }

    const [user] = await Promise.all([
      this.getUserById(userId),
      this.getUserById(friendId),
    ]);

    if (hasId(user.friends, friendId)) {
      throw new AppError('Usuario ja esta na lista de amigos', 400);
    }

    if (hasId(user.solicitacao, friendId)) {
      throw new AppError('Solicitacao de amizade ja enviada', 400);
    }

    if (hasId(user.aprovacao, friendId)) {
      throw new AppError('Este usuario ja enviou uma solicitacao para voce', 400);
    }

    await Promise.all([
      userRepository.addSolicitacao(userId, friendId),
      userRepository.addAprovacao(friendId, userId),
    ]);

    return userRepository.getSolicitacao(userId);
  },

  // Busca os usuarios para quem o usuario logado ja enviou pedido de amizade.
  // Esses registros ficam aguardando aprovacao do outro usuario.
  async getSolicitacao(userId) {
    const user = await userRepository.getSolicitacao(userId);
    return user.solicitacao;
  },

  // Busca os usuarios que enviaram pedido de amizade para o usuario logado.
  // Esses registros podem ser aprovados ou reprovados pelo usuario atual.
  async getAprovacao(userId) {
    const user = await userRepository.getAprovacao(userId);
    return user.aprovacao;
  },

  // Aprova um pedido recebido. O friendId precisa estar na lista de aprovacao
  // do usuario logado; ao aprovar, os dois usuarios passam a ter um ao outro
  // em friends e o pedido pendente e removido das listas auxiliares.
  async approveFriend(userId, friendId) {
    if (userId === friendId) {
      throw new AppError('Nao e possivel aprovar a si mesmo como amigo', 400);
    }

    const [user, friend] = await Promise.all([
      this.getUserById(userId),
      this.getUserById(friendId),
    ]);

    if (hasId(user.friends, friendId)) {
      throw new AppError('Usuario ja esta na lista de amigos', 400);
    }

    if (!hasId(user.aprovacao, friendId)) {
      throw new AppError('Solicitacao de amizade nao encontrada para aprovacao', 404);
    }

    if (!hasId(friend.solicitacao, userId)) {
      throw new AppError('Solicitacao de amizade nao encontrada no usuario solicitante', 404);
    }

    await userRepository.approveFriendship(userId, friendId);
    return userRepository.getFriends(userId);
  },

  // Reprova um pedido recebido. O friendId sai da lista de aprovacao do usuario
  // logado e o userId sai da lista de solicitacao de quem enviou o convite.
  async rejectFriend(userId, friendId) {
    if (userId === friendId) {
      throw new AppError('Nao e possivel reprovar a si mesmo como amigo', 400);
    }

    const [user, friend] = await Promise.all([
      this.getUserById(userId),
      this.getUserById(friendId),
    ]);

    if (!hasId(user.aprovacao, friendId)) {
      throw new AppError('Solicitacao de amizade nao encontrada para reprovacao', 404);
    }

    if (!hasId(friend.solicitacao, userId)) {
      throw new AppError('Solicitacao de amizade nao encontrada no usuario solicitante', 404);
    }

    await userRepository.rejectFriendship(userId, friendId);
    return userRepository.getAprovacao(userId);
  },

  // Recupera os amigos do usuario. O repository faz o populate para trocar os ids
  // dos amigos por dados uteis como nome e email.
  async getFriends(userId) {
    return userRepository.getFriends(userId);
  },
};
