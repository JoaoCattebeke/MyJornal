import { Router } from "express";
import {
  login,
  register,
  refreshAccessToken,
  logout,
  logoutAll,
} from "../controllers/authController.js";

const router = Router();

// POST /auth/register: encaminha o cadastro para o controller de autenticacao.
router.post("/register", register);

// POST /auth/login: recebe email/senha e retorna tokens quando as credenciais batem.
router.post("/login", login);

// POST /auth/refresh: usa um refresh token valido para gerar novo access token.
router.post("/refresh", refreshAccessToken);

// POST /auth/logout: encerra somente a sessao ligada ao refresh token enviado.
router.post("/logout", logout);

// POST /auth/logout-all: remove todos os refresh tokens do usuario autenticado.
router.post("/logout-all", logoutAll);

export default router;
