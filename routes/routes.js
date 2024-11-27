const express = require('express');
const { Client } = require('pg'); // Alterado para usar Client
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// habilita o CORS para acesso ao frontend
app.use(cors());

// configura body parser para tratar JSON
app.use(bodyParser.json());

router.post('/cadastro', async (req, res, next) => {
  const { nome, email, senha } = req.body; // pega os dados do corpo da requisição

  // verifica os campos obrigatórios 
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
    await client.connect(); 

    // insere o usuário no bd
    const result = await client.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senha]
    );

    // retorna os dados do usuário 
    res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      usuario: result.rows[0], // retorna id, nome e email (sem a senha no retorno)
    });
  } catch (err) {
    console.error('Erro durante o cadastro de usuário:', err); 

    // tratamento de erros específicos
    if (err.code === '23505') {
      return res.status(409).json({ error: 'O email já está em uso.' });
    }
    // caso o erro não seja de chave duplicada, passa o erro para o middleware
    next(err);
  } finally {
    await client.end(); // fecha a conexão com o banco após a requisição
  }
});

router.post('/despesas', async (req, res, next) => {
  const { descricao, valor, data_despesa, id_categoria } = req.body;

  // verifica se todos os campos obrigatórios foram fornecidos
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
    await client.connect(); 

    // verifica se o id_categoria existe na tabela categoria_despesa
    const categoryResult = await client.query(
      'SELECT id FROM categoria_despesa WHERE id = $1',
      [id_categoria]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(400).json({ error: 'Categoria não encontrada.' });
    }

    // insere a despesa na tabela
    const result = await client.query(
      'INSERT INTO despesas (descricao, valor, data_despesa, id_categoria) VALUES ($1, $2, $3, $4) RETURNING id, descricao, valor, data_despesa, id_categoria',
      [descricao, valor, data_despesa, id_categoria] 
    );    

    // retorna os dados da despesa cadastrada
    res.status(201).json({
      message: 'Despesa cadastrada com sucesso.',
      despesa: result.rows[0],
    });
  } catch (err) {
    console.error('Erro durante o cadastro de despesa:', err);
    next(err);
  } finally {
    await client.end(); // fecha a conexão com o banco
  }
});

// middleware de erro centralizado 
router.use((err, req, res, next) => {
  console.error('Erro no servidor:', err); 
  res.status(500).json({ error: 'Erro interno no servidor.', details: err.message });
});

app.use('/api', router);

// defini a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
