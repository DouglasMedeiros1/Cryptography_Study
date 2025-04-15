const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


// Configuração dos parâmetros de conexão com o MySQL
const dbConfig = {
  host: 'localhost',            // Substitua pelo seu host, se necessário
  port: 3306,                    // Porta padrão
  user: 'root',                 // Seu usuário MySQL
  password: 'root123',          // Sua senha MySQL
  database: 'ATV_Seguranca', // Nome do banco de dados
};

// Criação do pool de conexões
let pool;
(async () => {
  try {
    pool = await mysql.createPool(dbConfig);
    console.log("Conexão com o MySQL estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar com o MySQL:", error);
  }
})();

// ------------- Rotas para Chaves AES ---------------

// Obter todas as chaves AES
app.get('/api/aeskeys', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM aes_keys ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar as chaves AES.' });
  }
});

// Cadastrar uma nova chave AES
app.post('/api/aeskeys', async (req, res) => {
  const { key_value } = req.body;
  if (!key_value) {
    return res.status(400).json({ message: 'Chave inválida.' });
  }
  try {
    const [result] = await pool.query('INSERT INTO aes_keys (key_value) VALUES (?)', [key_value]);
    res.status(201).json({ id: result.insertId, key_value, created_at: new Date() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar a chave AES.' });
  }
});

// Deletar uma chave AES por ID
app.delete('/api/aeskeys/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM aes_keys WHERE id = ?', [id]);
    res.status(200).json({ message: 'Chave AES deletada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar a chave AES.' });
  }
});

// ------------- Rotas para Pares de Chaves RSA ---------------

// Obter todos os pares de chaves RSA
app.get('/api/rsakeys', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM rsa_key_pairs ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar os pares de chaves RSA.' });
  }
});

// Cadastrar um novo par de chaves RSA
app.post('/api/rsakeys', async (req, res) => {
  const { public_key, private_key } = req.body;
  if (!public_key || !private_key) {
    return res.status(400).json({ message: 'Chave pública e privada são necessárias.' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO rsa_key_pairs (public_key, private_key) VALUES (?, ?)', 
      [public_key, private_key]
    );
    res.status(201).json({ id: result.insertId, public_key, private_key, created_at: new Date() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar o par de chaves RSA.' });
  }
});

// Deletar um par de chaves RSA por ID
app.delete('/api/rsakeys/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM rsa_key_pairs WHERE id = ?', [id]);
    res.status(200).json({ message: 'Par de chaves RSA deletado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o par de chaves RSA.' });
  }
});

// Inicia o servidor na porta definida (ou 3001 por padrão)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
