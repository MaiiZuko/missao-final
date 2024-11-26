const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // Carregar variáveis de ambiente

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Conexão bem-sucedida com o banco de dados!'))
  .catch(err => console.error('Erro de conexão:', err))
  .finally(() => client.end());
