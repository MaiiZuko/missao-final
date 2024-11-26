// middlewares/errorMiddleware.js

/**
 * Middleware de tratamento de erros.
 * Captura erros que ocorrem nas rotas e os processa de maneira centralizada.
 * 
 * @param {Error} err - Objeto de erro capturado.
 * @param {Request} req - Objeto de solicitação.
 * @param {Response} res - Objeto de resposta.
 * @param {Function} next - Próximo middleware (não utilizado aqui).
 */
const errorMiddleware = (err, req, res, next) => {
    // Log do erro no console para fins de depuração
    console.error('Erro capturado pelo middleware:', err.stack);
  
    // Resposta padrão de erro
    res.status(err.status || 500).json({
      message: err.message || 'Ocorreu um erro no servidor.',
      status: err.status || 500,
    });
  };
  
  module.exports = errorMiddleware;
  