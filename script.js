document.addEventListener('DOMContentLoaded', function () {
    const formAtendimento = document.getElementById('formAtendimento');
    const tabelaEmAndamento = document.querySelector('#emAndamento tbody');
    const tabelaZeloInforma = document.querySelector('#zeloInforma tbody');
    const tabelaFinalizado = document.querySelector('#finalizado tbody');
// Array para armazenar os atendimentos
let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];
// TEMPORARIO TEMPORARIO TEMPORARIO TEMPORARIO TEMPORARIO OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
 {
    // Atendimentos em andamento
    atendimentos.push(
        { numeroVegas: '1001', cpfTitular: '123.456.789-00', nomeTitular: 'João Silva', nomeFalecido: 'Maria Silva', cidadeEstado: 'São Paulo/SP', prestador: 'Funerária A', status: 'emAndamento', observacoes: [] },
        { numeroVegas: '1002', cpfTitular: '234.567.890-11', nomeTitular: 'Carlos Oliveira', nomeFalecido: 'Ana Oliveira', cidadeEstado: 'Rio de Janeiro/RJ', prestador: 'Funerária B', status: 'emAndamento', observacoes: [] },
        { numeroVegas: '1003', cpfTitular: '345.678.901-22', nomeTitular: 'Fernanda Costa', nomeFalecido: 'Pedro Costa', cidadeEstado: 'Belo Horizonte/MG', prestador: 'Funerária C', status: 'emAndamento', observacoes: [] },
        { numeroVegas: '1004', cpfTitular: '456.789.012-33', nomeTitular: 'Ricardo Santos', nomeFalecido: 'Juliana Santos', cidadeEstado: 'Curitiba/PR', prestador: 'Funerária D', status: 'emAndamento', observacoes: [] },
        { numeroVegas: '1005', cpfTitular: '567.890.123-44', nomeTitular: 'Patrícia Lima', nomeFalecido: 'Roberto Lima', cidadeEstado: 'Porto Alegre/RS', prestador: 'Funerária E', status: 'emAndamento', observacoes: [] },
        { numeroVegas: '1006', cpfTitular: '678.901.234-55', nomeTitular: 'Lucas Pereira', nomeFalecido: 'Carla Pereira', cidadeEstado: 'Salvador/BA', prestador: 'Funerária F', status: 'emAndamento', observacoes: [] },
        { numeroVegas: '1007', cpfTitular: '789.012.345-66', nomeTitular: 'Mariana Alves', nomeFalecido: 'Gustavo Alves', cidadeEstado: 'Recife/PE', prestador: 'Funerária G', status: 'emAndamento', observacoes: [] },
        { numeroVegas: '1008', cpfTitular: '890.123.456-77', nomeTitular: 'Felipe Rocha', nomeFalecido: 'Tatiane Rocha', cidadeEstado: 'Fortaleza/CE', prestador: 'Funerária H', status: 'emAndamento', observacoes: [] },
        { numeroVegas: '1009', cpfTitular: '901.234.567-88', nomeTitular: 'Amanda Souza', nomeFalecido: 'Rodrigo Souza', cidadeEstado: 'Brasília/DF', prestador: 'Funerária I', status: 'emAndamento', observacoes: [] },
        { numeroVegas: '1010', cpfTitular: '012.345.678-99', nomeTitular: 'Bruno Martins', nomeFalecido: 'Camila Martins', cidadeEstado: 'Manaus/AM', prestador: 'Funerária J', status: 'emAndamento', observacoes: [] }
    );

    // Atendimentos em Zelo Informa
    atendimentos.push(
        { numeroVegas: '2001', cpfTitular: '111.222.333-44', nomeTitular: 'Ana Paula', nomeFalecido: 'José Silva', cidadeEstado: 'São Paulo/SP', prestador: 'Funerária K', status: 'zeloInforma', observacoes: [] },
        { numeroVegas: '2002', cpfTitular: '222.333.444-55', nomeTitular: 'Roberto Carlos', nomeFalecido: 'Maria Clara', cidadeEstado: 'Rio de Janeiro/RJ', prestador: 'Funerária L', status: 'zeloInforma', observacoes: [] },
        { numeroVegas: '2003', cpfTitular: '333.444.555-66', nomeTitular: 'Carla Dias', nomeFalecido: 'Antônio Dias', cidadeEstado: 'Belo Horizonte/MG', prestador: 'Funerária M', status: 'zeloInforma', observacoes: [] },
        { numeroVegas: '2004', cpfTitular: '444.555.666-77', nomeTitular: 'Marcos Lima', nomeFalecido: 'Fernanda Lima', cidadeEstado: 'Curitiba/PR', prestador: 'Funerária N', status: 'zeloInforma', observacoes: [] },
        { numeroVegas: '2005', cpfTitular: '555.666.777-88', nomeTitular: 'Juliana Rocha', nomeFalecido: 'Ricardo Rocha', cidadeEstado: 'Porto Alegre/RS', prestador: 'Funerária O', status: 'zeloInforma', observacoes: [] }
    );

    // Atendimentos finalizados
    atendimentos.push(
        { numeroVegas: '3001', cpfTitular: '666.777.888-99', nomeTitular: 'Paulo Henrique', nomeFalecido: 'Luciana Silva', cidadeEstado: 'São Paulo/SP', prestador: 'Funerária P', status: 'finalizado', observacoes: [] },
        { numeroVegas: '3002', cpfTitular: '777.888.999-00', nomeTitular: 'Luiza Almeida', nomeFalecido: 'Carlos Almeida', cidadeEstado: 'Rio de Janeiro/RJ', prestador: 'Funerária Q', status: 'finalizado', observacoes: [] }
    );

    // Salva os atendimentos de exemplo no localStorage
    localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
}
// TEMPORARIO TEMPORARIO TEMPORARIO TEMPORARIO TEMPORARIO OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
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
        mostrarPopupConfirmacaoSalvar();

        // Fecha a modal e limpa o formulário
        fecharModal();
        formAtendimento.reset();
    });

    // Função para mostrar o pop-up de confirmação de salvamento
    function mostrarPopupConfirmacaoSalvar() {
        const modalConfirmacaoSalvar = document.getElementById('modalConfirmacaoSalvar');
        modalConfirmacaoSalvar.style.display = 'flex';

        // Fecha o pop-up após 2 segundos e redireciona para a tela de atendimentos
        setTimeout(() => {
            modalConfirmacaoSalvar.style.display = 'none';
            window.location.href = 'index.html'; // Redireciona para a página principal
        }, 2000);
    }

    // Fechar modal de confirmação de salvamento
    document.getElementById('fecharConfirmacaoSalvar').addEventListener('click', function () {
        document.getElementById('modalConfirmacaoSalvar').style.display = 'none';
        window.location.href = 'index.html'; // Redireciona para a página principal
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

    // Carregar atendimentos ao abrir a página
    function carregarAtendimentos() {
        atendimentos.forEach(atendimento => {
            atualizarTabela(atendimento);
        });
    }

    // Carrega os atendimentos ao abrir a página
    carregarAtendimentos();
});

// Adicionar evento de input no campo de pesquisa
document.getElementById('campoPesquisa').addEventListener('input', function () {
    const termo = this.value.trim().toLowerCase();
    filtrarAtendimentos(termo);
});

// Função para filtrar atendimentos
function filtrarAtendimentos(termo) {
    const linhasEmAndamento = document.querySelectorAll('#emAndamento tbody tr');
    const linhasZeloInforma = document.querySelectorAll('#zeloInforma tbody tr');
    const linhasFinalizado = document.querySelectorAll('#finalizado tbody tr');

    filtrarTabela(linhasEmAndamento, termo);
    filtrarTabela(linhasZeloInforma, termo);
    filtrarTabela(linhasFinalizado, termo);
}

// Função para filtrar uma tabela específica
function filtrarTabela(linhas, termo) {
    linhas.forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        if (textoLinha.includes(termo)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
}

// Adicionar eventos aos botões das abas
document.querySelectorAll('.abaLink').forEach(botao => {
    botao.addEventListener('click', function () {
        const aba = this.getAttribute('data-aba');

        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('.abaLink').forEach(b => b.classList.remove('active'));

        // Adiciona a classe 'active' ao botão clicado
        this.classList.add('active');

        // Oculta todas as tabelas
        document.querySelectorAll('.abaConteudo').forEach(tabela => {
            tabela.classList.remove('active');
        });

        // Exibe a tabela correspondente à aba clicada
        document.getElementById(aba).classList.add('active');
    });
});