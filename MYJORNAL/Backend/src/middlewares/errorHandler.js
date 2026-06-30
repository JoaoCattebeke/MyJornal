// Middleware central de erros do Express. Toda funcao que chama next(error) cai
// aqui; por isso este ponto decide qual status HTTP e qual mensagem a API devolve
// para cada tipo de problema.
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors)
      .map((e) => e.message);
    return res.status(422).json({
      success: false,
      message: 'Dados inválidos',
      errors,
    });
  }

  // ID inválido (CastError do Mongoose)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID inválido',
    });
  }

  // Email duplicado
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Registro já existe',
    });
  }

  // Erros de negócio lançados nos Services
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Erro genérico
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
  });
};
