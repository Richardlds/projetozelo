document.addEventListener('DOMContentLoaded', function () {
    const formEditar = document.getElementById('editarAtendimento');
    const listaObservacoes = document.getElementById('listaObservacoes');
    const campoObservacoes = document.getElementById('observacoes');
    const btnAdicionarObservacao = document.getElementById('adicionarObservacao');

    // Simulação de um atendimento carregado (você pode buscar isso de um array ou API)
    const atendimento = {
        numeroVegas: '12345',
        cpfTitular: '123.456.789-00',
        nomeTitular: 'Fulano de Tal',
        nomeFalecido: 'Ciclano de Tal',
        cidadeEstado: 'São Paulo/SP',
        prestador: 'Hospital X',
        status: 'emAndamento',
        observacoes: [],
    };

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

        alert('Atendimento atualizado com sucesso!');
    });

    // Carrega os dados ao abrir a página
    carregarDados();
});