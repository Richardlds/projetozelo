document.addEventListener('DOMContentLoaded', function () {
    const formAtendimento = document.getElementById('formAtendimento');
    const tabelaEmAndamento = document.querySelector('#emAndamento tbody');
    const tabelaZeloInforma = document.querySelector('#zeloInforma tbody');
    const tabelaFinalizado = document.querySelector('#finalizado tbody');

    // Array para armazenar os atendimentos
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];

    // Função para adicionar atendimento
    formAtendimento.addEventListener('submit', function (e) {
        e.preventDefault();

        // Captura os dados do formulário
        const numeroVegas = document.getElementById('numeroVegas').value.trim();
        const cpfTitular = document.getElementById('cpfTitular').value.trim();
        const nomeTitular = document.getElementById('nomeTitular').value.trim();
        const nomeFalecido = document.getElementById('nomeFalecido').value.trim();
        const cidadeEstado = document.getElementById('cidadeEstado').value.trim();
        const prestador = document.getElementById('prestador').value.trim();
        const status = document.getElementById('status').value;

        // Valida se todos os campos obrigatórios foram preenchidos
        if (!numeroVegas || !cpfTitular || !nomeTitular || !nomeFalecido || !cidadeEstado || !prestador || !status) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Cria o objeto do atendimento
        const atendimento = {
            numeroVegas,
            cpfTitular,
            nomeTitular,
            nomeFalecido,
            cidadeEstado,
            prestador,
            status,
            observacoes: [], // Observações são opcionais e começam vazias
        };

        // Adiciona o atendimento ao array
        atendimentos.push(atendimento);

        // Salva no localStorage
        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));

        // Atualiza a tabela correspondente ao status
        atualizarTabela(atendimento);

        // Exibe o pop-up de confirmação
        mostrarPopupConfirmacao();

        // Fecha a modal e limpa o formulário
        fecharModal();
        formAtendimento.reset();
    });

    // Função para atualizar a tabela
    function atualizarTabela(atendimento) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${atendimento.numeroVegas}</td>
            <td>${atendimento.cpfTitular}</td>
            <td>${atendimento.nomeTitular}</td>
            <td>${atendimento.nomeFalecido}</td>
            <td>${atendimento.cidadeEstado}</td>
            <td>${atendimento.prestador}</td>
        `;

        // Adiciona um evento de clique na linha para abrir o atendimento
        row.addEventListener('click', () => abrirDetalhes(atendimento.numeroVegas));

        // Adiciona a linha na tabela correta
        if (atendimento.status === 'emAndamento') {
            tabelaEmAndamento.appendChild(row);
        } else if (atendimento.status === 'zeloInforma') {
            tabelaZeloInforma.appendChild(row);
        } else if (atendimento.status === 'finalizado') {
            tabelaFinalizado.appendChild(row);
        }
    }

    // Função para abrir a modal de adicionar atendimento
    document.getElementById('abrirModal').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'flex';
    });

    // Função para fechar a modal
    function fecharModal() {
        document.getElementById('modal').style.display = 'none';
    }

    // Fechar modal ao clicar no "X"
    document.querySelector('.fecharModal').addEventListener('click', fecharModal);

    // Função para abrir os detalhes do atendimento
    function abrirDetalhes(numeroVegas) {
        // Redireciona para a página de detalhes com o número do Vegas como parâmetro
        window.location.href = `detalhes.html?numeroVegas=${numeroVegas}`;
    }

    // Função para mostrar o pop-up de confirmação
    function mostrarPopupConfirmacao() {
        const modalConfirmacao = document.getElementById('modalConfirmacao');
        modalConfirmacao.style.display = 'flex';

        // Fecha o pop-up após 2 segundos e redireciona para a tela de atendimentos
        setTimeout(() => {
            modalConfirmacao.style.display = 'none';
        }, 2000);
    }

    // Carregar atendimentos ao abrir a página
    function carregarAtendimentos() {
        atendimentos.forEach(atendimento => {
            atualizarTabela(atendimento);
        });
    }

    // Carrega os atendimentos ao abrir a página
    carregarAtendimentos();
});