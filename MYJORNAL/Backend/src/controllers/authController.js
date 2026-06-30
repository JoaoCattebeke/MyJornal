import { authService } from "../services/authService.js";
import { AppError } from "../errors/AppError.js";

// Controller da rota de login. Ele pega email e senha do corpo da requisicao,
// valida se os dois campos foram enviados, chama o service para conferir as
// credenciais e, se estiver tudo certo, devolve os tokens e dados basicos do usuario.
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email e senha são obrigatórios", 400);
    }

    const { user, accessToken, refreshToken } = await authService.login(email, password);

    res.status(200).json({
      message: "Login realizado com sucesso",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller de cadastro. Ele recebe nome, email e senha, garante que os campos
// obrigatorios existem, delega a criacao para o service e retorna status 201
// junto com os tokens para o usuario ja ficar autenticado apos o cadastro.
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Nome, email e senha são obrigatórios", 400);
    }

    const { user, accessToken, refreshToken } = await authService.register(name, email, password);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller usado para renovar a sessao. O access token expira rapido, entao
// esta funcao recebe um refresh token valido, pede ao service um novo access token
// e devolve esse token para o cliente continuar acessando rotas protegidas.
export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError("Refresh token é obrigatório", 400);
    }

    const { accessToken } = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
      message: "Access token renovado com sucesso",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// Controller de logout de uma sessao. Ele recebe o refresh token usado naquela
// sessao e pede ao service para remove-lo da lista salva no usuario, impedindo
// que esse token seja usado novamente para renovar o login.
export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError("Refresh token é obrigatório", 400);
    }

    await authService.logout(refreshToken);

    res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    next(error);
  }
};

// Controller de logout geral. Ele usa o req.userId preenchido pelo middleware de
// autenticacao e manda o service apagar todos os refresh tokens desse usuario,
// encerrando o acesso em todos os dispositivos.
export const logoutAll = async (req, res, next) => {
  try {
    const userId = req.userId;

    await authService.logoutAll(userId);

    res
      .status(200)
      .json({ message: "Logout de todos os dispositivos realizado" });
  } catch (error) {
    next(error);
  }
};

