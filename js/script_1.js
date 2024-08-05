function showQuiz(quizId) {
    // Oculta o quiz atual
    const currentQuiz = document.querySelector("section[id^='quiz']:not([style='display: none;'])");
    if (currentQuiz) {
        currentQuiz.style.display = "none";
    }

    // Exibe o quiz selecionado
    const selectedQuiz = document.getElementById(quizId);
    if (selectedQuiz) {
        selectedQuiz.style.display = "block";
    } else {
        console.error(`Quiz com ID '${quizId}' não encontrado.`);
        return;
    }

    // Atualiza a barra de progresso e configura o próximo quiz
    updateProgress(quizId);
}

let currentQuizIndex = 0; // Inicializa o índice do quiz atual
const totalQuizzes = 10;

function updateProgress(quizId) {
    // Oculta todos os quizzes
    const allQuizzes = document.querySelectorAll("section[id^='quiz']");
    allQuizzes.forEach(quiz => {
        quiz.style.display = "none";
    });

    // Exibe o quiz correspondente ao quizId
    const currentQuiz = document.getElementById(quizId);
    if (currentQuiz) {
        currentQuiz.style.display = "block";

        // Verifica se não é o último quiz
        if (currentQuizIndex < totalQuizzes) {
            currentQuizIndex++;
        }

        // Atualiza a largura da barra de progresso
        const progressWidth = (currentQuizIndex / totalQuizzes) * 100 + "%";
        document.querySelector(".progress").style.width = progressWidth;

        // Configura o próximo quiz automaticamente
        const nextQuizId = `quiz${currentQuizIndex}`;
        configurarQuiz(nextQuizId); // Chamada para configurar o próximo quiz
    } else {
        console.error(`Quiz com ID '${quizId}' não encontrado.`);
    }
}



document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf');
    const continuarButton = document.querySelector('.continuar');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const statusMessage = document.getElementById('statusMessage');
    const quiz4 = document.getElementById('quiz4');
    const quiz5 = document.getElementById('quiz5');
    const quiz6 = document.getElementById('quiz6');
    const quiz7 = document.getElementById('quiz7');

    // Função para validar o CPF
    function validarCPF(cpf) {
        return /^\d{11}$/.test(cpf);
    }

    // Event listener para o input do CPF
    cpfInput.addEventListener('input', () => {
        const cpf = cpfInput.value.trim();
        continuarButton.disabled = !validarCPF(cpf);
    });

    // Event listener para o envio do formulário
    document.getElementById('cpfForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const cpf = cpfInput.value.trim();
        // Exibir mensagem "Checando disponibilidade"
        statusMessage.innerHTML = 'Checando disponibilidade...';
        statusMessage.style.display = 'block';
        progressContainer.style.display = 'block';

        // Simula um processo de carregamento antes de redirecionar ou exibir mensagem
        let width = 0;
        const increment = 1;
        const intervalTime = 50;

        const progress = setInterval(() => {
            if (width >= 100) {
                clearInterval(progress);

// Enviar o CPF para verificação no servidor
const xhr = new XMLHttpRequest();
xhr.open('POST.html', 'cadastro.html', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
        const response = xhr.responseText.trim();
        if (response === 'success') {
            // Exibir mensagem de sucesso
            statusMessage.innerHTML = 'CPF cadastrado com sucesso!';
            statusMessage.classList.add('mensagem-sucesso');
            statusMessage.classList.remove('mensagem-erro');
            statusMessage.style.display = 'block';

            // Ocultar o quiz4 e exibir o quiz5 após 2 segundos
            setTimeout(() => {
                quiz4.style.display = 'none';
                quiz5.style.display = 'block';
                configurarCard(document.getElementById('card2')); // Configura o próximo card (quiz6)
            }, 2000);
        } else if (response === 'exists') {
            // Exibir mensagem de CPF já cadastrado
            statusMessage.innerHTML = 'Este CPF já foi cadastrado e a promoção resgatada.';
            statusMessage.classList.add('mensagem-erro');
            statusMessage.classList.remove('mensagem-sucesso');
            statusMessage.style.display = 'block';
        } else {
            // Exibir mensagem de sucesso
            statusMessage.innerHTML = 'CPF cadastrado com sucesso!';
            statusMessage.classList.add('mensagem-sucesso');
            statusMessage.classList.remove('mensagem-erro');
            statusMessage.style.display = 'block';

            // Ocultar o quiz4 e exibir o quiz5 após 2 segundos
            setTimeout(() => {
                quiz4.style.display = 'none';
                quiz5.style.display = 'block';
                configurarCard(document.getElementById('card2')); // Configura o próximo card (quiz6)
            }, 2000);
        }
    } else {
            // Exibir mensagem de sucesso
            statusMessage.innerHTML = 'CPF cadastrado com sucesso!';
            statusMessage.classList.add('mensagem-sucesso');
            statusMessage.classList.remove('mensagem-erro');
            statusMessage.style.display = 'block';

            // Ocultar o quiz4 e exibir o quiz5 após 2 segundos
            setTimeout(() => {
                quiz4.style.display = 'none';
                quiz5.style.display = 'block';
                configurarCard(document.getElementById('card2')); // Configura o próximo card (quiz6)
            }, 2000);
    }
};
xhr.onerror = function() {
    // Exibir mensagem de erro de conexão
    statusMessage.innerHTML = 'Erro de conexão. Tente novamente mais tarde.';
    statusMessage.classList.add('mensagem-erro');
    statusMessage.classList.remove('mensagem-sucesso');
    statusMessage.style.display = 'block';
};
xhr.send('cpf=' + encodeURIComponent(cpf));
} else {
width += increment;
progressBar.style.width = width + '%';
}
}, intervalTime);
});

    // Configura o primeiro card para iniciar o processo (quiz6)
    configurarCard(document.getElementById('card2'));
});



document.addEventListener('DOMContentLoaded', function () {

    function configurarQuiz(quizId) {
        const card = document.getElementById(quizId);
        const botoesResposta = card.querySelectorAll('.resposta__grade');
        const botaoEnviar = card.querySelector('.card__enviarResposta');

        let avaliacaoTexto = '';

        botoesResposta.forEach(botao => {
            botao.addEventListener('click', function () {
                avaliacaoTexto = this.getAttribute('data-valor');
                // Remover a classe 'selecionado' de todos os botões de resposta
                botoesResposta.forEach(botao => {
                    botao.classList.remove('selecionado');
                });
                // Adicionar a classe 'selecionado' apenas ao botão atualmente clicado
                this.classList.add('selecionado');
                // Verificar seleção após cada clique
                verificarSelecoes();
            });
        });

        function verificarSelecoes() {
            if (avaliacaoTexto !== '') {
                botaoEnviar.disabled = false;
            } else {
                botaoEnviar.disabled = true;
            }
        }

        botaoEnviar.addEventListener('click', function() {
            const nextCardId = this.getAttribute('data-next-card');
            const nextCard = document.getElementById(nextCardId);

            if (nextCard) {
                card.style.display = 'none';
                nextCard.style.display = 'block';

                // Configurar o próximo card (quiz) automaticamente
                configurarQuiz(nextCardId);
            }
        });
    }

    // Configurar o primeiro quiz (quiz5) para iniciar o processo
    configurarQuiz('quiz5');
});


// final

document.addEventListener('DOMContentLoaded', function () {
    // Configura o card do quiz6 para iniciar o processo
    configurarCard(document.getElementById('card2'));

    // Configura o card do quiz7 para iniciar o processo
    configurarCard(document.getElementById('card3'));
});




document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopup');

    // Exibir o pop-up ao carregar a página
    popup.style.display = 'block';

    // Fechar o pop-up ao clicar no botão "Começar"
    closePopupBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        // Aqui você pode iniciar o quiz ou fazer outras ações
        console.log('Iniciar quiz...');
    });
});





document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf');

    // Event listener para o input do CPF
    cpfInput.addEventListener('input', function(event) {
        let value = event.target.value;

        // Remove caracteres não numéricos
        value = value.replace(/\D/g, '');

        // Limita a entrada a 11 caracteres
        value = value.substring(0, 11);

        // Atualiza o valor do campo
        event.target.value = value;
    });
});
