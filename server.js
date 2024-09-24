const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Importando CORS
const User = require('./models/user');
const app = express();

// Configurar CORS para permitir requisições do frontend
const allowedOrigins = ['https://pod-fra.vercel.app', 'http://localhost:3000'];

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'A origem ' + origin + ' não tem permissão de acesso.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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

// Servindo arquivos estáticos (página frontend)
app.use(express.static('public'));

// Valida domínio do e-mail
const validateEmailDomain = (email) => {
    const domain = email.split('@')[1];
    return domain === 'sp.senac.br'; // Mantenha a lógica que você precisa
};

// Rota de registro de usuário
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ success: false, message: 'Por favor, preencha todos os campos.' });
    }

    if (!validateEmailDomain(email)) {
        return res.status(400).send({ success: false, message: 'Email inválido' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ success: false, message: 'Usuário já existente' });
        }

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

    if (!email || !password) {
        return res.status(400).send({ success: false, message: 'Por favor, preencha todos os campos.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ success: false, message: 'Email ou senha inválidos' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ success: false, message: 'Email ou senha inválidos' });
        }

        const jwtSecret = process.env.JWT_SECRET || 'defaultsecret';
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).send({ success: true, token });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Erro ao fazer login' });
    }
});

// Rota de atualização de usuário (opcional, caso você precise)
app.post('/update', async (req, res) => {
    const { email, password } = req.body;

    if (!validateEmailDomain(email)) {
        return res.status(400).send({ success: false, message: 'Email inválido' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ success: false, message: 'Usuário não encontrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();
        res.status(200).send({ success: true, message: 'Cadastro atualizado com sucesso' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Erro ao atualizar o cadastro' });
    }
});
