const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors'); // Adicionado para permitir requisições de diferentes origens
const app = express();
const port = process.env.PORT || 3000; // Usar a porta do ambiente ou 3000

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Substitua pelo host do seu banco de dados
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '@Richard12e', // Substitua pela sua senha do MySQL
    database: 'atendimentos_db' // Substitua pelo nome do seu banco de dados
});

// Middleware para permitir o uso de JSON e CORS
app.use(express.json());
app.use(cors({
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a raiz (/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para buscar todos os atendimentos
app.get('/atendimentos', (req, res) => {
    connection.query('SELECT * FROM atendimentos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para buscar um atendimento por número Vegas
app.get('/atendimentos/:numeroVegas', (req, res) => {
    const numeroVegas = req.params.numeroVegas;

    connection.query('SELECT * FROM atendimentos WHERE numeroVegas = ?', [numeroVegas], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo atendimento
app.post('/atendimentos', (req, res) => {
    const { numeroVegas, cpfTitular, nomeTitular, nomeFalecido, cidadeEstado, prestador, status } = req.body;

    // Validação básica dos campos
    if (!numeroVegas || !cpfTitular || !nomeTitular || !nomeFalecido || !cidadeEstado || !prestador || !status) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verifica se o atendimento já existe
    connection.query('SELECT * FROM atendimentos WHERE numeroVegas = ?', [numeroVegas], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Atendimento já existe' });
        }

        // Se não existir, insere o novo atendimento
        connection.query(
            'INSERT INTO atendimentos (numeroVegas, cpfTitular, nomeTitular, nomeFalecido, cidadeEstado, prestador, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [numeroVegas, cpfTitular, nomeTitular, nomeFalecido, cidadeEstado, prestador, status],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ id: results.insertId });
            }
        );
    });
});

// Rota para atualizar um atendimento
app.put('/atendimentos/:numeroVegas', (req, res) => {
    const numeroVegas = req.params.numeroVegas;
    const { cpfTitular, nomeTitular, nomeFalecido, cidadeEstado, prestador, status } = req.body;

    // Validação básica dos campos
    if (!cpfTitular || !nomeTitular || !nomeFalecido || !cidadeEstado || !prestador || !status) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    connection.query(
        'UPDATE atendimentos SET cpfTitular = ?, nomeTitular = ?, nomeFalecido = ?, cidadeEstado = ?, prestador = ?, status = ? WHERE numeroVegas = ?',
        [cpfTitular, nomeTitular, nomeFalecido, cidadeEstado, prestador, status, numeroVegas],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Atendimento não encontrado' });
            }
            res.json({ message: 'Atendimento atualizado com sucesso' });
        }
    );
});

// Rota para excluir um atendimento
app.delete('/atendimentos/:numeroVegas', (req, res) => {
    const numeroVegas = req.params.numeroVegas;

    connection.query('DELETE FROM atendimentos WHERE numeroVegas = ?', [numeroVegas], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }
        res.json({ message: 'Atendimento excluído com sucesso' });
    });
});

// Rota para adicionar uma observação a um atendimento
app.post('/atendimentos/:numeroVegas/observacoes', (req, res) => {
    const numeroVegas = req.params.numeroVegas;
    const { observacao } = req.body;

    if (!observacao) {
        return res.status(400).json({ error: 'A observação é obrigatória' });
    }

    connection.query(
        'INSERT INTO observacoes (numeroVegas, observacao) VALUES (?, ?)',
        [numeroVegas, observacao],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: results.insertId });
        }
    );
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
