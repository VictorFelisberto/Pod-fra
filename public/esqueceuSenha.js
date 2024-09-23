document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('#attPassword');
    const passwordAgainInput = form.querySelector('#attAgainPassword');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const passwordAgain = passwordAgainInput.value.trim();

        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        if (password !== passwordAgain) {
            alert('As senhas não coincidem.');
            return;
        }

        const data = {
            email: email,
            password: password
        };

        fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Cadastro atualizado com sucesso!');
                window.location.href = 'index.html'; // Redirecionar para index.html
            } else {
                alert('Erro ao atualizar o cadastro: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar o cadastro:', error);
            alert('Erro ao atualizar o cadastro');
        });
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
