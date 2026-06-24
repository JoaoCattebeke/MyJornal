import { Router } from "express";
import { postController } from "../controllers/postController.js";
import { validate } from "../middlewares/validate.js";
import { createPostSchema, deletePostSchema } from "../schemas/postSchema.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// POST /api/post => Criar post
router.post("/", authenticate, validate(createPostSchema), postController.create);

// DELETE /api/post/:id => Deletar post (apenas o criador pode deletar)
router.delete("/:id", authenticate, validate(deletePostSchema), postController.delete);

// GET /api/post => Posts cadastrados pelo usuário logado
router.get("/", authenticate, postController.getByUser);

// GET /api/post/list => Posts visíveis para o usuário logado
router.get("/list", authenticate, postController.list);

export default router;
