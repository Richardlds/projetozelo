const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON e CORS
app.use(express.json());
app.use(cors({
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

// Conectar ao MongoDB Atlas
const dbURI = process.env.DB_URI || 'mongodb+srv://richardlds2005:Gorila12e@zeloup.kclxl.mongodb.net/?retryWrites=true&w=majority&appName=ZELOUP';
mongoose.connect(dbURI, {
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Definir o schema para atendimentos
const atendimentoSchema = new mongoose.Schema({
    numeroVegas: { type: String, required: true, unique: true },
    cpfTitular: { type: String, required: true },
    nomeTitular: { type: String, required: true },
    nomeFalecido: { type: String, required: true },
    cidadeEstado: { type: String, required: true },
    prestador: { type: String, required: true },
    status: { type: String, required: true }
});

// Definir o schema para observações
const observacaoSchema = new mongoose.Schema({
    numeroVegas: { type: String, required: true },
    observacao: { type: String, required: true }
});

// Criar os modelos
const Atendimento = mongoose.model('Atendimento', atendimentoSchema);
const Observacao = mongoose.model('Observacao', observacaoSchema);

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a raiz (/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para buscar todos os atendimentos
app.get('/atendimentos', async (req, res) => {
    try {
        const atendimentos = await Atendimento.find();
        res.json(atendimentos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para buscar um atendimento por número Vegas
app.get('/atendimentos/:numeroVegas', async (req, res) => {
    try {
        const atendimento = await Atendimento.findOne({ numeroVegas: req.params.numeroVegas });
        if (!atendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }
        res.json(atendimento);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para adicionar um novo atendimento
app.post('/atendimentos', async (req, res) => {
    const { numeroVegas, cpfTitular, nomeTitular, nomeFalecido, cidadeEstado, prestador, status } = req.body;

    // Validação básica dos campos
    if (!numeroVegas || !cpfTitular || !nomeTitular || !nomeFalecido || !cidadeEstado || !prestador || !status) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        // Verifica se o atendimento já existe
        const atendimentoExistente = await Atendimento.findOne({ numeroVegas });
        if (atendimentoExistente) {
            return res.status(400).json({ error: 'Atendimento já existe' });
        }

        // Cria um novo atendimento
        const novoAtendimento = new Atendimento({
            numeroVegas,
            cpfTitular,
            nomeTitular,
            nomeFalecido,
            cidadeEstado,
            prestador,
            status
        });

        await novoAtendimento.save();
        res.json({ id: novoAtendimento._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para atualizar um atendimento
app.put('/atendimentos/:numeroVegas', async (req, res) => {
    const { cpfTitular, nomeTitular, nomeFalecido, cidadeEstado, prestador, status } = req.body;

    // Validação básica dos campos
    if (!cpfTitular || !nomeTitular || !nomeFalecido || !cidadeEstado || !prestador || !status) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const atendimentoAtualizado = await Atendimento.findOneAndUpdate(
            { numeroVegas: req.params.numeroVegas },
            { cpfTitular, nomeTitular, nomeFalecido, cidadeEstado, prestador, status },
            { new: true }
        );

        if (!atendimentoAtualizado) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }

        res.json({ message: 'Atendimento atualizado com sucesso', atendimento: atendimentoAtualizado });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para excluir um atendimento
app.delete('/atendimentos/:numeroVegas', async (req, res) => {
    try {
        const atendimentoExcluido = await Atendimento.findOneAndDelete({ numeroVegas: req.params.numeroVegas });

        if (!atendimentoExcluido) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }

        res.json({ message: 'Atendimento excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para adicionar uma observação a um atendimento
app.post('/atendimentos/:numeroVegas/observacoes', async (req, res) => {
    const { observacao } = req.body;

    if (!observacao) {
        return res.status(400).json({ error: 'A observação é obrigatória' });
    }

    try {
        const novaObservacao = new Observacao({
            numeroVegas: req.params.numeroVegas,
            observacao
        });

        await novaObservacao.save();
        res.json({ id: novaObservacao._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para buscar observações de um atendimento
app.get('/atendimentos/:numeroVegas/observacoes', async (req, res) => {
    try {
        const observacoes = await Observacao.find({ numeroVegas: req.params.numeroVegas });
        res.json(observacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
