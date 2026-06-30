import { userService } from "../services/userService.js";
import { AppError } from "../errors/AppError.js";

const requireFriendId = (friendId) => {
  if (!friendId) {
    throw new AppError("O campo friendId e obrigatorio", 400);
  }
};

export const userController = {
  // Lista todos os usuarios cadastrados. O controller apenas chama o service,
  // recebe os dados prontos e monta a resposta HTTP padronizada da API.
  async getAll(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Busca um usuario especifico pelo id vindo da URL. Se o service encontrar,
  // retorna o usuario; se houver erro, envia o erro para o middleware central.
  async getById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  // Cria um usuario com os dados do corpo da requisicao. A regra de negocio,
  // como verificar email repetido e criptografar senha, fica dentro do service.
  async create(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  // Retorna usuarios que podem virar amigos do usuario logado. O id do usuario
  // vem de req.userId, preenchido depois que o token de acesso foi validado.
  async getAvailableFriends(req, res, next) {
    try {
      const users = await userService.getAvailableFriends(req.userId);
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  },

  // Envia um pedido de amizade. O friendId vai para solicitacao do usuario logado,
  // e o id do usuario logado vai para aprovacao do usuario convidado.
  async addFriend(req, res, next) {
    try {
      const { friendId } = req.body;
      requireFriendId(friendId);

      const user = await userService.addFriend(req.userId, friendId);
      res.status(200).json({
        success: true,
        message: "Solicitacao de amizade enviada com sucesso",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // Lista os usuarios para quem o usuario logado enviou pedido de amizade.
  async getSolicitacao(req, res, next) {
    try {
      const users = await userService.getSolicitacao(req.userId);
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  },

  // Lista os usuarios que enviaram pedido de amizade para o usuario logado.
  async getAprovacao(req, res, next) {
    try {
      const users = await userService.getAprovacao(req.userId);
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  },

  // Aprova um pedido recebido e move os dois usuarios para a lista friends.
  async approveFriend(req, res, next) {
    try {
      const { friendId } = req.body;
      requireFriendId(friendId);

      const user = await userService.approveFriend(req.userId, friendId);
      res.status(200).json({
        success: true,
        message: "Solicitacao de amizade aprovada com sucesso",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // Reprova um pedido recebido e remove a pendencia dos dois usuarios.
  async rejectFriend(req, res, next) {
    try {
      const { friendId } = req.body;
      requireFriendId(friendId);

      const user = await userService.rejectFriend(req.userId, friendId);
      res.status(200).json({
        success: true,
        message: "Solicitacao de amizade reprovada com sucesso",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // Busca a lista de amigos do usuario logado. O service devolve o usuario com
  // o campo friends preenchido, e o controller retorna apenas essa lista.
  async getFriends(req, res, next) {
    try {
      const user = await userService.getFriends(req.userId);
      const friends = user.friends;
      res.status(200).json({ success: true, data: friends });
    } catch (error) {
      next(error);
    }
  },
};
