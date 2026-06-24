import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jornal";
export const JWT_SECRET =
  process.env.JWT_SECRET ||
  "sua-chave-secreta-muito-segura-aqui-com-muitos-caracteres";
export const REFRESH_SECRET =
  process.env.REFRESH_SECRET ||
  "sua-chave-refresh-muito-segura-aqui-com-muitos-caracteres-diferentes";
export const ACCESS_TOKEN_EXPIRATION = "15m"; // 15 minutos
export const REFRESH_TOKEN_EXPIRATION = "7d"; // 7 dias
