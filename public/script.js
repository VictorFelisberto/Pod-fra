// Obtendo referências aos elementos do botão de registro, botão de login e contêiner principal
const registerBtn = document.getElementById('register'); 
const container = document.getElementById('container');
const loginBtn = document.getElementById('login');

// Adiciona uma classe "active" ao contêiner quando o botão de registro é clicado
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

// Remove a classe "active" do contêiner quando o botão de login é clicado
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// -----------------------------------------------------------------------------------------------------------------------

// Espera que o conteúdo do documento esteja completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Obtendo referências aos formulários de inscrição e login
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    // Adiciona um listener de evento para o formulário de inscrição
    signUpForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página

        // Obtém os valores dos campos de inscrição e remove os espaços em branco
        const name = document.getElementById('signUpName').value.trim();
        const email = document.getElementById('signUpEmail').value.trim();
        const password = document.getElementById('signUpPassword').value.trim();

        // Verifica se todos os campos foram preenchidos
        if (!name || !email || !password) {
            alert('Por favor, preencha todos os campos.');
            return; // Para a execução da função se algum campo estiver vazio
        }

        // Verifica se o e-mail é válido
        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return; // Para a execução da função se o e-mail não for válido
        }

        try {
            // Envia uma solicitação POST para o servidor com os dados de inscrição
            const response = await fetch('https://pod-fra.vercel.app/register', { // URL completa do servidor
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password }) // Envia os dados como JSON
            });

            // Verifica se a resposta não é válida (exemplo, erro 404 ou 500)
            if (!response.ok) {
                throw new Error('Erro na solicitação: ' + response.status);
            }

            const text = await response.text(); // Lê a resposta como texto para inspecionar erros
            console.log(text); // Log para inspeção do conteúdo da resposta

            // Tenta converter para JSON
            const data = JSON.parse(text);
            if (data.success) {
                alert('Usuário registrado com sucesso!');
            } else {
                alert('Erro ao registrar o usuário: ' + data.message);
            }

        } catch (error) {
            console.error('Erro ao registrar:', error);
            alert('Erro ao registrar o usuário: ' + error.message);
        }
    });

    // Adiciona um listener de evento para o formulário de login
    signInForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página

        // Obtém os valores dos campos de login e remove os espaços em branco
        const email = document.getElementById('signInEmail').value.trim();
        const password = document.getElementById('signInPassword').value.trim();

        // Verifica se todos os campos foram preenchidos
        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return; // Para a execução da função se algum campo estiver vazio
        }

        // Verifica se o e-mail é válido
        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return; // Para a execução da função se o e-mail não for válido
        }

        try {
            // Envia uma solicitação POST para o servidor com os dados de login
            const response = await fetch('https://pod-fra.vercel.app/login', { // URL completa do servidor
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) // Envia os dados como JSON
            });

            // Verifica se a resposta não é válida (exemplo, erro 404 ou 500)
            if (!response.ok) {
                throw new Error('Erro na solicitação: ' + response.status);
            }

            const text = await response.text(); // Lê a resposta como texto
            console.log(text); // Log para inspeção do conteúdo da resposta

            // Tenta converter para JSON
            const data = JSON.parse(text);
            if (data.success) {
                // Redireciona para a página de podcasts em caso de sucesso no login
                window.location.href = '/menuPodcasts.html';
            } else {
                alert('Erro ao fazer login: ' + data.message);
            }

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login: ' + error.message);
        }
    });

    // Função para validar o formato do e-mail usando uma expressão regular
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para verificar formato de e-mail
        return emailRegex.test(email); // Retorna true se o e-mail for válido, false caso contrário
    }
});
