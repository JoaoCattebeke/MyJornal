import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Rotas de autenticação (públicas)
app.use("/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

// Rota simples de teste. Quando alguem acessa "/", a API responde um texto para
// mostrar que o servidor Express esta funcionando e recebendo requisicoes.
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Rota de exemplo que mostra como enviar JSON. Ela cria um objeto com mensagem
// e timestamp atual, depois usa res.json para transformar esse objeto em resposta HTTP.
app.get("/api/data", (req, res) => {
  const data = {
    message: "This is some sample data from the API.",
    timestamp: new Date(),
  };
  res.json(data);
});

app.use(errorHandler);
export default app;
