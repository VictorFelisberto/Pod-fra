# Pod-fra

## 🎯 Visão geral  
O Pod-fra é um sistema full-stack desenvolvido como projeto de portfólio com o objetivo de **gerenciar e autenticar usuários**, com backend em Node.js/Express e frontend em HTML/CSS/JavaScript.  
Ele permite cadastro/login de usuários (com criptografia de senha e geração de token JWT) e demonstra integração entre front e back num ambiente real de deploy.

## 🔍 Principais funcionalidades  
- Cadastro de usuário com validação de e-mail e criptografia via bcrypt.  
- Login autenticado com geração de token JWT para sessões seguras.  
- Conexão com banco de dados MongoDB para persistência de usuários.  
- Estrutura de backend organizada (rotas, controllers, middlewares).  
- Deploy em ambiente de produção (por exemplo, Render) — link disponível no README.  
- Interface simples e responsiva em HTML/CSS/JS para interação com o backend.

## 🛠️ Tecnologias utilizadas  
- **Backend**: Node.js, Express.js, bcrypt, jsonwebtoken, Mongoose.  
- **Banco de dados**: MongoDB.  
- **Frontend**: HTML5, CSS3, JavaScript (ES6+).  
- **Deploy**: Render (ou outro ambiente escolhido).  
- **Ferramentas auxiliares**: Git & GitHub para versionamento, dotenv para configuração de variáveis de ambiente.

## 🚀 Instalação e execução local  
### Pré-requisitos  
- Node.js (versão >= 14.x)  
- npm ou yarn  
- MongoDB (ou acesso a um cluster MongoDB Atlas)  

### Passos  
```bash
# 1. Clonar o repositório
git clone https://github.com/VictorFelisberto/Pod-fra.git
cd Pod-fra

# 2. Instalar dependências
npm install           # ou yarn install

# 3. Configurar variáveis de ambiente
# Criar um arquivo .env com as seguintes variáveis:
#   MONGO_URI=<sua conexão MongoDB>
#   JWT_SECRET=<chave secreta para JWT>
#   PORT=<porta desejada>

# 4. Iniciar o servidor
npm start             # ou nodemon se preferir hot-reload

# 5. Acessar o frontend
# Abrir no navegador: http://localhost:<PORT>
```

📄 Uso
Acesse a página de cadastro e crie um novo usuário.

Realize login com as credenciais cadastradas.

Após o login, teste endpoints protegidos (rotas que exigem token JWT) para comprovar autenticação funcionando.

(Opcional) Verifique o deploy online no link disponibilizado no topo do README.

📂 Estrutura do projeto (resumida)
bash
Copiar código
/Pod-fra  
├── /controllers      # Lógica das rotas  
├── /models           # Schemas Mongoose  
├── /routes           # Definição das rotas Express  
├── /middlewares      # Middlewares (ex: autenticação JWT)  
├── /public           # Frontend estático (HTML/CSS/JS)  
├── .env              # Variáveis de ambiente (não commitadas)  
├── server.js         # Ponto de entrada do backend  
└── README.md


✅ O que aprendi
A integração entre frontend e backend num projeto real de autenticação.

Uso de bcrypt para criptografia segura de senhas e jsonwebtoken para sessões baseadas em token.

Modelagem de dados com Mongoose + MongoDB.

Deploy de aplicação full-stack em ambiente de produção.

Organização de código seguindo boas práticas de separação de responsabilidades (controllers, routes, models, middlewares).
