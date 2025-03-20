document.addEventListener('DOMContentLoaded', function () {
    const formEditar = document.getElementById('editarAtendimento');
    const listaObservacoes = document.getElementById('listaObservacoes');
    const campoObservacoes = document.getElementById('observacoes');
    const btnAdicionarObservacao = document.getElementById('adicionarObservacao');

    // Captura o número do Vegas da URL
    const urlParams = new URLSearchParams(window.location.search);
    const numeroVegas = urlParams.get('numeroVegas');

    // Carrega os atendimentos do localStorage
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];

    // Busca o atendimento pelo número do Vegas
    const atendimento = atendimentos.find(at => at.numeroVegas === numeroVegas);

    if (!atendimento) {
        alert('Atendimento não encontrado!');
        window.location.href = 'index.html'; // Redireciona para a lista de atendimentos
        return;
    }

    // Carrega os dados do atendimento no formulário
    function carregarDados() {
        document.getElementById('numeroVegas').value = atendimento.numeroVegas;
        document.getElementById('cpfTitular').value = atendimento.cpfTitular;
        document.getElementById('nomeTitular').value = atendimento.nomeTitular;
        document.getElementById('nomeFalecido').value = atendimento.nomeFalecido;
        document.getElementById('cidadeEstado').value = atendimento.cidadeEstado;
        document.getElementById('prestador').value = atendimento.prestador;
        document.getElementById('status').value = atendimento.status;

        // Carrega as observações
        atualizarListaObservacoes();
    }

    // Atualiza a lista de observações
    function atualizarListaObservacoes() {
        listaObservacoes.innerHTML = '';
        atendimento.observacoes.forEach(obs => {
            const li = document.createElement('li');
            li.textContent = obs;
            listaObservacoes.appendChild(li);
        });
    }

    // Adiciona uma nova observação
    btnAdicionarObservacao.addEventListener('click', function () {
        const observacao = campoObservacoes.value.trim();
        if (observacao) {
            atendimento.observacoes.push(observacao);
            atualizarListaObservacoes();
            campoObservacoes.value = '';

            // Salva no localStorage
            localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
        }
    });

    // Salva as alterações do formulário
    formEditar.addEventListener('submit', function (e) {
        e.preventDefault();

        // Atualiza os dados do atendimento
        atendimento.cpfTitular = document.getElementById('cpfTitular').value;
        atendimento.nomeTitular = document.getElementById('nomeTitular').value;
        atendimento.nomeFalecido = document.getElementById('nomeFalecido').value;
        atendimento.cidadeEstado = document.getElementById('cidadeEstado').value;
        atendimento.prestador = document.getElementById('prestador').value;
        atendimento.status = document.getElementById('status').value;

        // Salva no localStorage
        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));

        alert('Atendimento atualizado com sucesso!');
        window.location.href = 'index.html'; // Redireciona para a página principal
    });

    // Função para fechar a janela de detalhes
function fecharDetalhes() {
    window.location.href = 'index.html'; // Redireciona para a página principal
}

// Adicionar evento ao botão de fechar (x)
document.querySelector('.fecharDetalhes').addEventListener('click', fecharDetalhes);

    // Carrega os dados ao abrir a página
    carregarDados();
});
// Função para deletar atendimento
document.getElementById('deletarAtendimento').addEventListener('click', function () {
    const modalConfirmacao = document.getElementById('modalConfirmacao');
    modalConfirmacao.style.display = 'flex';
});

// Confirmar deleção
document.getElementById('confirmarDelecao').addEventListener('click', function () {
    // Remove o atendimento do array
    atendimentos = atendimentos.filter(at => at.numeroVegas !== numeroVegas);

    // Salva no localStorage
    localStorage.setItem('atendimentos', JSON.stringify(atendimentos));

    // Fecha o modal de confirmação
    document.getElementById('modalConfirmacao').style.display = 'none';

    // Redireciona para a página principal
    window.location.href = 'index.html';
});

// Cancelar deleção
document.getElementById('cancelarDelecao').addEventListener('click', function () {
    document.getElementById('modalConfirmacao').style.display = 'none';
});