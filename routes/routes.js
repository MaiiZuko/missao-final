const express = require('express');
const { Client } = require('pg'); // Alterado para usar Client
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// Habilitar o CORS para permitir acesso ao frontend
app.use(cors());

// Configurar o body parser para tratar JSON
app.use(bodyParser.json());

// Cadastro de usuário
router.post('/cadastro', async (req, res, next) => {
  const { nome, email, senha } = req.body; // Obtém os dados do corpo da requisição

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect(); // Conecta ao banco de dados

    // Insere o usuário no banco de dados
    const result = await client.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senha]
    );

    // Retorna os dados do usuário criado
    res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      usuario: result.rows[0], // Retorna id, nome e email (sem a senha no retorno)
    });
  } catch (err) {
    console.error('Erro durante o cadastro de usuário:', err); // Log do erro no console

    // Tratamento de erros específicos
    if (err.code === '23505') {
      // Código para chave duplicada (email único)
      return res.status(409).json({ error: 'O email já está em uso.' });
    }
    
    // Caso o erro não seja de chave duplicada, passa o erro para o middleware
    next(err);
  } finally {
    await client.end(); // Fecha a conexão com o banco após a requisição
  }
});

// Cadastro de despesa
router.post('/despesas', async (req, res, next) => {
  const { descricao, valor, data_despesa, id_categoria } = req.body;

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!descricao || !valor || !data_despesa || !id_categoria) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect(); // Conecta ao banco de dados

    // Verifica se o id_categoria existe na tabela categoria_despesa
    const categoryResult = await client.query(
      'SELECT id FROM categoria_despesa WHERE id = $1',
      [id_categoria]
    );

    if (categoryResult.rows.length === 0) {
      // Se não encontrar a categoria
      return res.status(400).json({ error: 'Categoria não encontrada.' });
    }

    // Insere a despesa na tabela
    const result = await client.query(
      'INSERT INTO despesas (descricao, valor, data_despesa, id_categoria) VALUES ($1, $2, $3, $4) RETURNING id, descricao, valor, data_despesa, id_categoria',
      [descricao, valor, data_despesa, id_categoria] // Certifique-se de que a categoria está sendo enviada como id
    );    

    // Retorna os dados da despesa cadastrada
    res.status(201).json({
      message: 'Despesa cadastrada com sucesso.',
      despesa: result.rows[0],
    });
  } catch (err) {
    console.error('Erro durante o cadastro de despesa:', err);

    // Tratamento de erros específicos
    if (err.code === '23503') {
      // Código para chave estrangeira inválida
      return res.status(400).json({ error: 'Categoria não encontrada.' });
    }

    // Passa outros erros para o middleware
    next(err);
  } finally {
    await client.end(); // Fecha a conexão com o banco
  }
});

// Middleware de erro centralizado (deve ser configurado no `server.js`)
router.use((err, req, res, next) => {
  console.error('Erro no servidor:', err); // Log do erro no console
  res.status(500).json({ error: 'Erro interno no servidor.', details: err.message });
});

// Registrar as rotas
app.use('/api', router);

// Definir a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
