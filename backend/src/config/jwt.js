import jwt from "jsonwebtoken";
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "sua-chave-secreta-muito-segura-aqui-com-muitos-caracteres";
const REFRESH_SECRET =
  process.env.REFRESH_SECRET ||
  "sua-chave-refresh-muito-segura-aqui-com-muitos-caracteres-diferentes";
const ACCESS_TOKEN_EXPIRATION = "15m"; // 15 minutos
const REFRESH_TOKEN_EXPIRATION = "7d"; // 7 dias

// Cria o access token, que e o token usado nas rotas protegidas. Ele guarda o
// userId dentro do payload e expira rapido para reduzir risco se for roubado.
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

// Cria o refresh token, usado apenas para pedir um novo access token. Ele dura
// mais tempo e usa outro segredo para separar a seguranca dos dois tipos de token.
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

// Verifica se o access token foi assinado com o segredo correto e se ainda nao
// expirou. Quando e valido, retorna o payload; quando falha, retorna null.
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Verifica se o refresh token e valido. O try/catch evita quebrar a aplicacao
// quando o token esta expirado, alterado ou assinado com segredo incorreto.
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

// Gera os dois tokens usados no login. Separar em uma funcao evita repetir a
// mesma logica no cadastro e na autenticacao.
export const generateTokens = (userId) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};
