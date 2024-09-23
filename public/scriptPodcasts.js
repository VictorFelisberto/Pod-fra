document.addEventListener("DOMContentLoaded", function() {
    // Pegando todos os links dos meses
    const mesesLinks = document.querySelectorAll('.meses ul a');

    // Adicionando um event listener para cada link
    mesesLinks.forEach(link => {
        link.addEventListener('click', scrollToMonth);
    });

    // Função para lidar com o clique nos links dos meses
    function scrollToMonth(event) {
        event.preventDefault(); // Evitar o comportamento padrão do link

        const targetId = this.getAttribute('href'); // Pegar o ID do alvo
        const targetElement = document.getElementById(targetId); // Pegar o elemento alvo

        if (targetElement) {
            // Calcular a posição do elemento alvo
            const targetPosition = targetElement.offsetTop;

            // Animar o scroll suave até a posição do elemento alvo
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o elemento com o id 'logo' e o armazena na constante 'logo'
    const logo = document.getElementById('logo');
    // Seleciona o elemento com o id 'sidebar' e o armazena na constante 'sidebar'
    const sidebar = document.getElementById('sidebar');
    // Armazena o conteúdo original do elemento 'logo' na variável 'originalLogoText'
    const originalLogoText = logo.innerHTML;

    // Adiciona um evento de clique ao elemento 'logo'
    logo.addEventListener('click', function () {
        // Verifica se a 'sidebar' contém a classe 'sidebar-hidden'
        if (sidebar.classList.contains('sidebar-hidden')) {
            // Remove a classe 'sidebar-hidden' da 'sidebar' para mostrá-la
            sidebar.classList.remove('sidebar-hidden');
            // Retorna o conteúdo do 'logo' ao texto original
            logo.innerHTML = originalLogoText; // Retorna ao texto original do logo
        } else {
            // Adiciona a classe 'sidebar-hidden' à 'sidebar' para escondê-la
            sidebar.classList.add('sidebar-hidden');
            // Altera o conteúdo do 'logo' para um ícone de seta
            logo.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Troca para o ícone de seta
        }
    
        // Alinha ao centro a classe 'main-container' quando a 'sidebar' estiver escondida
        const container = document.getElementsByClassName('podFra-playlists')[0];
        if (sidebar.classList.contains('sidebar-hidden')) {
            container.classList.add('center-aligned');
        } else {
            container.classList.remove('center-aligned');
        }
    });    
});
