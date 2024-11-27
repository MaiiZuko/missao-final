const express = require('express');
const { Client } = require('pg');
const router = express.Router();

// Rota de login
router.post('/login', async (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
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
    const result = await client.query(
      'SELECT id, nome, email FROM usuarios WHERE email = $1 AND senha = $2',
      [email, senha]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Retorna informações do usuário no login bem-sucedido
    res.status(200).json({
      message: 'Login bem-sucedido.',
      usuario: result.rows[0],
    });
  } catch (err) {
    console.error('Erro durante o login:', err);
    next(err);
  } finally {
    await client.end();
  }
});

// Rota para cadastro
router.post('/cadastro', async (req, res, next) => {
  const { nome, email, senha } = req.body;

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
    const result = await client.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senha]
    );

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      usuario: result.rows[0],
    });
  } catch (err) {
    console.error('Erro durante o cadastro de usuário:', err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'O email já está em uso.' });
    }
    next(err);
  } finally {
    await client.end();
  }
});

// Rota para despesas
router.post('/despesas', async (req, res, next) => {
  const { descricao, valor, data_despesa, id_categoria } = req.body;

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
    const categoryResult = await client.query(
      'SELECT id FROM categoria_despesa WHERE id = $1',
      [id_categoria]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(400).json({ error: 'Categoria não encontrada.' });
    }

    const result = await client.query(
      'INSERT INTO despesas (descricao, valor, data_despesa, id_categoria) VALUES ($1, $2, $3, $4) RETURNING id, descricao, valor, data_despesa, id_categoria',
      [descricao, valor, data_despesa, id_categoria]
    );

    res.status(201).json({
      message: 'Despesa cadastrada com sucesso.',
      despesa: result.rows[0],
    });
  } catch (err) {
    console.error('Erro durante o cadastro de despesa:', err);
    next(err);
  } finally {
    await client.end();
  }
});

// Exporta o router com todas as rotas
module.exports = router;
