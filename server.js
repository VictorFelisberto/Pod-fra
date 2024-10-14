const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path'); // Para servir arquivos estáticos
const User = require('./models/user');
const app = express();

app.use(express.static('public'));

// Configurar CORS para permitir requisições do frontend
const allowedOrigins = ['https://podfra.vercel.app', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        // Permite requisições de qualquer origem, útil para testes na Vercel
        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middlewares para parse de JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://PodFra:FqNDkGkTSOq2fXAt@podfra.00vfper.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Conectado'))
    .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Servindo arquivos estáticos do diretório 'public' (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Valida domínio do e-mail
const validateEmailDomain = (email) => {
    const domain = email.split('@')[1];
    return domain === 'sp.senac.br';
};

// Rota de registro de usuário
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !password) {
        return res.status(400).send({ success: false, message: 'Por favor, preencha todos os campos.' });
    }

    // Verifica se o domínio do e-mail é válido
    if (!validateEmailDomain(email)) {
        return res.status(400).send({ success: false, message: 'Email inválido' });
    }

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ success: false, message: 'Usuário já existente' });
        }

        // Criptografa a senha e cria um novo usuário
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send({ success: true, message: 'Usuário registrado com sucesso' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Erro ao registrar o usuário' });
    }
});

// Rota de login de usuário
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!email || !password) {
        return res.status(400).send({ success: false, message: 'Por favor, preencha todos os campos.' });
    }

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ success: false, message: 'Email ou senha inválidos' });
        }

        // Verifica se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ success: false, message: 'Email ou senha inválidos' });
        }

        // Gera o token JWT para o usuário logado
        const jwtSecret = process.env.JWT_SECRET || 'defaultsecret';
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).send({ success: true, token });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Erro ao fazer login' });
    }
});

// Rota de atualização de usuário
app.post('/update', async (req, res) => {
    const { email, password } = req.body;

    // Verifica se o domínio do e-mail é válido
    if (!validateEmailDomain(email)) {
        return res.status(400).send({ success: false, message: 'Email inválido' });
    }

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ success: false, message: 'Usuário não encontrado' });
        }

        // Atualiza a senha do usuário
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();
        res.status(200).send({ success: true, message: 'Cadastro atualizado com sucesso' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Erro ao atualizar o cadastro' });
    }
});

// Servindo a página inicial (index.html) do diretório 'public'
app.get('/', (req, res) => {
    res.sendFile(path.join
// Middleware global de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
});
