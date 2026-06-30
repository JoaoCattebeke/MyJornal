export class AppError extends Error {
  // Erro personalizado da aplicacao. Alem da mensagem padrao de Error, guarda
  // statusCode para o errorHandler saber qual codigo HTTP deve responder.
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}
