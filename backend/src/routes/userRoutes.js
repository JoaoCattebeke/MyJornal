import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// GET /api/users: lista usuarios. A rota exige token valido antes de chegar ao controller.
router.get("/", authenticate, userController.getAll);

// GET /api/users/availablefriends: mostra quem ainda pode ser adicionado como amigo.
router.get(
  "/availablefriends",
  authenticate,
  userController.getAvailableFriends,
);

// GET /api/users/friends: retorna os amigos do usuario logado.
router.get("/friends", authenticate, userController.getFriends);

// GET /api/users/solicitacao: lista pedidos enviados pelo usuario logado.
router.get("/solicitacao", authenticate, userController.getSolicitacao);

// GET /api/users/aprovacao: lista pedidos recebidos aguardando resposta.
router.get("/aprovacao", authenticate, userController.getAprovacao);

// POST /api/users/aprovacao: aprova o friendId recebido no corpo da requisicao.
router.post("/aprovacao", authenticate, userController.approveFriend);

// POST /api/users/reprovacao: reprova o friendId recebido no corpo da requisicao.
router.post("/reprovacao", authenticate, userController.rejectFriend);

// POST /api/users/add_friend: cria uma solicitacao de amizade pendente.
router.post("/add_friend", authenticate, userController.addFriend);

// GET /api/users/:id: busca um usuario especifico usando o parametro id da URL.
router.get("/:id", authenticate, userController.getById);

// POST /api/users: valida os dados com Zod antes de chamar o controller de criacao.
router.post(
  "/",
  authenticate,
  validate(createUserSchema),
  userController.create,
);

export default router;
