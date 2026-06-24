import { verifyAccessToken } from "../config/jwt.js";
import { AppError } from "../errors/AppError.js";

// Middleware de autenticacao. Ele le o header Authorization, espera o formato
// "Bearer <token>", valida o access token e, se estiver correto, salva o userId
// em req.userId para os proximos controllers saberem quem esta logado.
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Token de acesso não fornecido", 401));
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return next(new AppError("Token de acesso inválido ou expirado", 401));
  }

  req.userId = decoded.userId;
  next();
};
