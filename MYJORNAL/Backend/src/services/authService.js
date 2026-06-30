import { userRepository } from "../repositories/userRepository.js";
import { userService } from "./userService.js";
import { generateTokens, verifyRefreshToken } from "../config/jwt.js";
import { AppError } from "../errors/AppError.js";

export const authService = {
  // Fluxo de login. Primeiro procura o usuario pelo email, depois compara a senha
  // informada com a senha criptografada no banco. Se tudo estiver correto, cria
  // accessToken e refreshToken, salva o refreshToken no usuario e devolve os dados.
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    await user.addRefreshToken(refreshToken);

    return { user, accessToken, refreshToken };
  },

  // Fluxo de cadastro. Antes de criar, verifica se ja existe alguem com o mesmo
  // email. Depois usa o userService para criar o usuario, gera os tokens e salva
  // o refreshToken inicial para permitir renovacao de sessao.
  async register(name, email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("Email já cadastrado", 409);
    }

    const user = await userService.createUser({ name, email, password });
    const { accessToken, refreshToken } = generateTokens(user._id);
    await user.addRefreshToken(refreshToken);

    return { user, accessToken, refreshToken };
  },

  // Renova o access token. A funcao valida a assinatura do refreshToken, busca o
  // usuario dono dele e confirma se esse token ainda esta salvo no banco. Essa
  // checagem evita renovar sessoes que ja fizeram logout.
  async refreshAccessToken(refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new AppError("Refresh token inválido ou expirado", 401);
    }

    const user = await userRepository.findById(decoded.userId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    if (!user.refreshTokens.includes(refreshToken)) {
      throw new AppError("Refresh token não autorizado", 401);
    }

    const { accessToken } = generateTokens(user._id);

    return { accessToken };
  },

  // Faz logout de uma sessao. O token e validado para descobrir o usuario dono;
  // se o usuario existir, o token recebido e removido da lista de refreshTokens.
  async logout(refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new AppError("Refresh token inválido", 401);
    }

    const user = await userRepository.findById(decoded.userId);
    if (user) {
      await user.removeRefreshToken(refreshToken);
    }
  },

  // Faz logout em todos os dispositivos. Busca o usuario pelo id autenticado e
  // limpa toda a lista de refreshTokens, impedindo qualquer renovacao futura.
  async logoutAll(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    await user.clearRefreshTokens();
  },
};
