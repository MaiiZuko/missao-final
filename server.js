const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');
const routes = require('./routes/routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

const requiredEnvVariables = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Erro: Variável de ambiente ${key} não está configurada no arquivo .env.`);
    process.exit(1);
  }
});

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', routes);

app.use(errorMiddleware);

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

process.on('SIGINT', async () => {
  console.log('\nEncerrando o servidor...');
  try {
    await pool.end();
    console.log('Conexão com o banco de dados encerrada.');
  } catch (err) {
    console.error('Erro ao encerrar o pool de conexões:', err);
  }

  server.close(() => {
    console.log('Servidor finalizado.');
    process.exit(0);
  });
});
