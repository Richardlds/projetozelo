document.addEventListener('DOMContentLoaded', function () {
    const formAtendimento = document.getElementById('formAtendimento');
    const tabelaEmAndamento = document.querySelector('#emAndamento tbody');
    const tabelaZeloInforma = document.querySelector('#zeloInforma tbody');
    const tabelaFinalizado = document.querySelector('#finalizado tbody');

    // Array para armazenar os atendimentos
    let atendimentos = [];

    // Função para adicionar atendimento
    formAtendimento.addEventListener('submit', function (e) {
        e.preventDefault();

        // Captura os dados do formulário
        const atendimento = {
            numeroVegas: document.getElementById('numeroVegas').value,
            cpfTitular: document.getElementById('cpfTitular').value,
            nomeTitular: document.getElementById('nomeTitular').value,
            nomeFalecido: document.getElementById('nomeFalecido').value,
            cidadeEstado: document.getElementById('cidadeEstado').value,
            prestador: document.getElementById('prestador').value,
            status: document.getElementById('status').value,
        };

        // Adiciona o atendimento ao array
        atendimentos.push(atendimento);

        // Atualiza a tabela correspondente ao status
        atualizarTabela(atendimento);

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
            <td><button onclick="editarAtendimento('${atendimento.numeroVegas}')">Editar</button></td>
        `;

        // Adiciona a linha na tabela correta
        if (atendimento.status === 'emAndamento') {
            tabelaEmAndamento.appendChild(row);
        } else if (atendimento.status === 'zeloInforma') {
            tabelaZeloInforma.appendChild(row);
        } else if (atendimento.status === 'finalizado') {
            tabelaFinalizado.appendChild(row);
        }
    }

    // Função para abrir a modal
    document.getElementById('abrirModal').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'flex';
    });

    // Função para fechar a modal
    function fecharModal() {
        document.getElementById('modal').style.display = 'none';
    }

    // Fechar modal ao clicar no "X"
    document.querySelector('.fecharModal').addEventListener('click', fecharModal);
});