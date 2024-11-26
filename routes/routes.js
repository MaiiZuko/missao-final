const express = require('express');
const { Client } = require('pg'); // Alterado para usar Client
const router = express.Router();

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

// Middleware de erro centralizado (deve ser configurado no `server.js`)
router.use((err, req, res, next) => {
  console.error('Erro no servidor:', err); // Log do erro no console
  res.status(500).json({ error: 'Erro interno no servidor.', details: err.message });
});

module.exports = router;
