// Carregar variáveis de ambiente
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db'); // Configuração do banco de dados
const routes = require('./routes/routes'); // Arquivo de rotas
const errorMiddleware = require('./middlewares/errorMiddleware'); // Middleware de erros

// Carregar variáveis de ambiente
dotenv.config();

// Validação das variáveis do .env
const requiredEnvVariables = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Erro: Variável de ambiente ${key} não está configurada no arquivo .env.`);
    process.exit(1); // Encerra a execução se faltar uma variável
  }
});

// Inicializando o Express
const app = express();

// Middleware para interpretar JSON nas requisições
app.use(express.json());

// Middleware para permitir CORS
app.use(cors());

// Configuração de rotas
app.use('/api', routes);

// Middleware para tratamento de erros
app.use(errorMiddleware);

// Definindo a porta para o servidor
const port = process.env.PORT || 3001;

// Iniciando o servidor
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Encerramento gracioso (Graceful Shutdown) - Fechar conexões ao encerrar
process.on('SIGINT', async () => {
  console.log('\nEncerrando o servidor...');
  try {
    await pool.end(); // Fecha o pool de conexões com o banco
    console.log('Conexão com o banco de dados encerrada.');
  } catch (err) {
    console.error('Erro ao encerrar o pool de conexões:', err);
  }

  server.close(() => {
    console.log('Servidor finalizado.');
    process.exit(0); // Finaliza o processo de forma limpa
  });
});
