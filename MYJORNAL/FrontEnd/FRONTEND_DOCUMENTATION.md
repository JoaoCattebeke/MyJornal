# Documentação do Frontend

## Visão geral

O frontend do MyJornal é uma aplicação React responsável por autenticação, navegação e consumo da API do backend. Depois do login, o usuário acessa uma área protegida com menu principal, listagem de publicações, criação de matéria, gerenciamento de amigos, conta e posts próprios.

## Tecnologias

- React
- React Router DOM
- React Bootstrap
- CSS tradicional por arquivo em `src/style`
- `fetch` para integração com o backend

## Como executar

```bash
cd frontend
npm install
npm start
```

Por padrão, o frontend consome a API em:

```txt
http://localhost:3001
```

Para trocar a URL da API, use a variável:

```bash
REACT_APP_API_URL=http://localhost:3001
```

## Estrutura principal

```txt
src/
  App.js                    Rotas da aplicação
  ProtectedRoute.js         Proteção das rotas logadas
  MenuPrincipal.js          Menu exibido nas páginas autenticadas
  services/api.js           Integração com backend e renovação JWT
  PrimeiraPagina.js         Página pública inicial
  FormLogin.js              Login
  FormCadastro.js           Cadastro
  Logado.js                 Home logada e listagem de publicações
  CriarMateria.js           Formulário para criar post
  VerMateria.js             Detalhe do post
  MeusPosts.js              Posts criados pelo usuário
  AdicionarAmigo.js         Busca e solicitação de amizade
  PedidosRecebidos.js       Aprovação/rejeição de pedidos
  SolicitacoesAmizade.js    Solicitações enviadas
  Amigos.js                 Lista de amigos
  Conta.js                  Dados da conta e logout
  style/                    Arquivos CSS por página ou grupo
```

## Rotas

Rotas públicas:

- `/`: página inicial
- `/formCadastro`: cadastro
- `/formLogin`: login

Rotas protegidas:

- `/logado`: home logada com publicações
- `/formMateria`: criação de matéria
- `/verMateria`: detalhe da matéria selecionada
- `/meusPosts`: posts do usuário
- `/adicionarAmigo`: adicionar amigos
- `/pedidosRecebidos`: pedidos recebidos
- `/solicitacoesAmizade`: solicitações enviadas
- `/amigos`: amigos
- `/conta`: informações da conta

As rotas protegidas passam por `ProtectedRoute`, que também injeta o `MenuPrincipal`.

## Integração com backend

Toda chamada ao backend deve usar `apiRequest`, em:

```txt
src/services/api.js
```

Exemplo:

```js
const response = await apiRequest("/api/post/list");
const data = getResponseData(response);
```

O helper `apiRequest` centraliza:

- URL base da API;
- headers JSON;
- envio do `Authorization: Bearer <accessToken>`;
- tratamento de erro;
- tentativa de refresh do token quando o backend retorna `401`;
- redirecionamento para login se a sessão não puder ser renovada.

## Autenticação e JWT

O login e o cadastro recebem do backend:

- `accessToken`
- `refreshToken`
- dados básicos do usuário

Esses dados são salvos no `localStorage` com a chave:

```txt
myjornal_auth
```

O `accessToken` é usado em rotas protegidas no header:

```txt
Authorization: Bearer <accessToken>
```

Quando uma chamada protegida recebe `401`, o frontend tenta renovar a sessão:

```txt
POST /auth/refresh
```

Se o backend aceitar o `refreshToken`, o frontend salva o novo `accessToken` e repete a requisição original. Se a renovação falhar, a sessão local é limpa e o usuário é enviado para `/formLogin`.

## Páginas principais

### Página inicial

`PrimeiraPagina.js`

Mostra o nome do sistema, imagens de destaque e botões para cadastro e login.

### Login

`FormLogin.js`

Envia email e senha para:

```txt
POST /auth/login
```

Em caso de sucesso, salva a sessão e redireciona para `/logado`.

### Cadastro

`FormCadastro.js`

Envia nome, email e senha para:

```txt
POST /auth/register
```

Em caso de sucesso, salva a sessão e entra na área logada.

### Home logada

`Logado.js`

Carrega publicações visíveis para o usuário:

```txt
GET /api/post/list
```

Cada publicação aparece como card com imagem e título. Ao clicar, o post é salvo temporariamente no `localStorage` em `myjornal_selected_post` e a navegação vai para `/verMateria`.

A página também possui filtro local. O usuário digita o termo e pressiona Enter para buscar; se limpar o campo, o filtro é removido automaticamente.

### Criar matéria

`CriarMateria.js`

Envia título, texto e visibilidade para:

```txt
POST /api/post
```

O backend gera a imagem automaticamente no campo `urlImagem`.

### Detalhe da matéria

`VerMateria.js`

Lê a matéria selecionada em `myjornal_selected_post` e exibe:

- título;
- texto;
- imagem `urlImagem`.

### Amigos

As páginas de amigos usam rotas protegidas da API:

- `GET /api/users/availablefriends`
- `POST /api/users/add_friend`
- `GET /api/users/aprovacao`
- `POST /api/users/aprovacao`
- `POST /api/users/reprovacao`
- `GET /api/users/solicitacao`
- `GET /api/users/friends`

## CSS

Os estilos ficam em `src/style`. As classes foram prefixadas por contexto para evitar conflitos globais:

- `logado-*`
- `primeira-*`
- `materia-*`
- `pedidos-*`

Formulários usam `cadastro.css`, incluindo login, cadastro e criação de matéria.

## Boas práticas no projeto

- Usar sempre `apiRequest` para chamadas ao backend.
- Não chamar `fetch` diretamente nos componentes.
- Manter rotas privadas dentro de `ProtectedRoute`.
- Ao criar novos estilos, prefixar as classes com o nome da página ou componente.
- Evitar classes genéricas como `botao`, `menu`, `conteudo` sem prefixo.
- Para novas telas logadas, adicionar a rota dentro do bloco protegido em `App.js`.
