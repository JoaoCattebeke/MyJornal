import { ZodError } from 'zod';

// Fabrica de middleware de validacao. Recebe um schema Zod e devolve uma funcao
// que o Express executa em cada requisicao da rota onde esse middleware for usado.
export const validate = (schema) => {
  // Middleware gerado. Ele organiza body, params e query em um unico objeto,
  // executa schema.parse e so chama next() se os dados estiverem corretos.
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Transforma os erros detalhados do Zod em uma lista simples para a API
        // responder qual campo falhou e qual mensagem deve ser mostrada.
        const errors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return res.status(422).json({
          success: false,
          errors,
        });
      }
      next(error);
    }
  };
};
