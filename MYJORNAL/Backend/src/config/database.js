import mongoose from 'mongoose';

// Abre a conexao com o MongoDB. A funcao le a URL do banco nas variaveis de
// ambiente, registra eventos de sucesso/erro e chama mongoose.connect para
// deixar os models prontos para consultas.
export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI não definida');
  }

  // Evento disparado pelo Mongoose quando a conexao com o banco e estabelecida.
  mongoose.connection.on('connected', () => {
    console.log(' MongoDB conectado');
  });

  // Evento disparado quando a conexao com o banco emite erro durante a execucao.
  mongoose.connection.on('error', (err) => {
    console.error(' Erro MongoDB:', err.message);
  });

  await mongoose.connect(uri, {
    dbName: process.env.DB_NAME || 'jornal',
  });
};
