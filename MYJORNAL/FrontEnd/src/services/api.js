const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const AUTH_KEY = "myjornal_auth";

// Evita disparar varias renovacoes de token ao mesmo tempo quando duas ou mais
// requisicoes protegidas recebem 401 simultaneamente.
let refreshPromise = null;

export function getSession() {
  const rawSession = localStorage.getItem(AUTH_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function saveSession(session) {
  // Guarda accessToken, refreshToken e dados basicos do usuario retornados pelo backend.
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  const session = getSession();
  // Se ainda existe refreshToken, o usuario pode tentar renovar a sessao.
  // A validade real do token continua sendo conferida pelo backend.
  return Boolean(session?.accessToken || session?.refreshToken);
}

export function getLoggedUser() {
  return getSession()?.user || null;
}

function redirectToLogin() {
  // Quando nao for possivel renovar o JWT, remove o acesso local levando o usuario
  // para autenticar novamente.
  if (window.location.pathname !== "/formLogin") {
    window.location.href = "/formLogin";
  }
}

async function parseResponseBody(response) {
  // O backend normalmente responde JSON, mas esse helper tambem aceita texto para
  // evitar erro quando alguma resposta vier sem content-type JSON.
  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("application/json")
    ? await response.json()
    : await response.text();
}

function getErrorMessage(body) {
  return body?.message || body?.error || "Nao foi possivel concluir a acao.";
}

async function refreshAccessToken() {
  const session = getSession();

  if (!session?.refreshToken) {
    clearSession();
    redirectToLogin();
    throw new Error("Sessao expirada. Faça login novamente.");
  }

  if (!refreshPromise) {
    // Fluxo de seguranca JWT: envia o refreshToken para o backend gerar um novo
    // accessToken. O refreshToken nao vai no header Authorization; ele e enviado
    // apenas para a rota especifica de renovacao.
    refreshPromise = fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    })
      .then(async (response) => {
        const body = await parseResponseBody(response);

        if (!response.ok) {
          throw new Error(getErrorMessage(body));
        }

        const updatedSession = {
          ...session,
          accessToken: body.accessToken,
        };

        // Mantem o refreshToken atual e troca somente o accessToken expirado.
        saveSession(updatedSession);
        return updatedSession.accessToken;
      })
      .catch((error) => {
        // Se o refreshToken tambem expirou ou foi recusado, a sessao local deixa
        // de ser confiavel e o usuario precisa voltar para o login.
        clearSession();
        redirectToLogin();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

async function sendApiRequest(path, options = {}, accessToken) {
  // Helper unico de integracao com o backend. Ele padroniza headers JSON e inclui
  // o accessToken no formato Bearer quando a rota exige autenticacao.
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
}

export async function apiRequest(path, options = {}) {
  const session = getSession();
  let response = await sendApiRequest(path, options, session?.accessToken);
  let body = await parseResponseBody(response);

  if (response.status === 401 && !path.startsWith("/auth/")) {
    // Requisicoes protegidas podem falhar quando o accessToken expira. Antes de
    // derrubar a sessao, tenta renovar o token e repetir a requisicao original uma vez.
    const newAccessToken = await refreshAccessToken();
    response = await sendApiRequest(path, options, newAccessToken);
    body = await parseResponseBody(response);
  }

  if (!response.ok) {
    if (response.status === 401) {
      // Se ainda assim o backend negar acesso, encerra a sessao no frontend.
      clearSession();
      redirectToLogin();
    }

    throw new Error(getErrorMessage(body));
  }

  return body;
}

export function getResponseData(response) {
  return response?.data ?? response;
}
