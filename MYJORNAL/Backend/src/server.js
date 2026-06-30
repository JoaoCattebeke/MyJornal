import app from "./app.js";
import 'dotenv/config';
import { connectDatabase }
  from './config/database.js';

const PORT = process.env.PORT || 3001;

// Funcao principal de inicializacao da aplicacao. Ela conecta no banco, roda os
// carregamentos iniciais de usuarios e posts, e so depois inicia o servidor para
// evitar que a API aceite requisicoes antes de estar pronta.
const start = async () => {
  try {
    await connectDatabase();

    // Inicia o Express na porta definida. O callback roda quando o servidor ja
    // esta escutando conexoes, por isso e um bom lugar para exibir a mensagem.
    app.listen(PORT, () => {
      console.log(
        ` Servidor rodando na porta ${PORT}`
      );
    });
  } catch (error) {
    console.error('Falha ao iniciar:', error);
    process.exit(1);
  }
};


start();
