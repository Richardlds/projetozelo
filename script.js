document.addEventListener('DOMContentLoaded', function () {
    const formAtendimento = document.getElementById('formAtendimento');
    const tabelaEmAndamento = document.querySelector('#emAndamento tbody');
    const tabelaZeloInforma = document.querySelector('#zeloInforma tbody');
    const tabelaFinalizado = document.querySelector('#finalizado tbody');

    // Inicializa o array de atendimentos
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];

    // Se não houver atendimentos no localStorage, cria 5 exemplos para cada status
    if (atendimentos.length === 0) {
        atendimentos = [
            // Atendimentos em andamento
            { numeroVegas: '1001', cpfTitular: '111.111.111-11', nomeTitular: 'João Silva', nomeFalecido: 'Maria Silva', cidadeEstado: 'São Paulo/SP', prestador: 'Funerária A', status: 'emAndamento', observacoes: [] },
            { numeroVegas: '1002', cpfTitular: '222.222.222-22', nomeTitular: 'Carlos Oliveira', nomeFalecido: 'Ana Oliveira', cidadeEstado: 'Rio de Janeiro/RJ', prestador: 'Funerária B', status: 'emAndamento', observacoes: [] },
            { numeroVegas: '1003', cpfTitular: '333.333.333-33', nomeTitular: 'Fernanda Costa', nomeFalecido: 'Pedro Costa', cidadeEstado: 'Belo Horizonte/MG', prestador: 'Funerária C', status: 'emAndamento', observacoes: [] },
            { numeroVegas: '1004', cpfTitular: '444.444.444-44', nomeTitular: 'Ricardo Almeida', nomeFalecido: 'Juliana Almeida', cidadeEstado: 'Curitiba/PR', prestador: 'Funerária D', status: 'emAndamento', observacoes: [] },
            { numeroVegas: '1005', cpfTitular: '555.555.555-55', nomeTitular: 'Patrícia Lima', nomeFalecido: 'Marcos Lima', cidadeEstado: 'Porto Alegre/RS', prestador: 'Funerária E', status: 'emAndamento', observacoes: [] },

            // Atendimentos Zelo Informa
            { numeroVegas: '2001', cpfTitular: '666.666.666-66', nomeTitular: 'Luiz Souza', nomeFalecido: 'Clara Souza', cidadeEstado: 'Salvador/BA', prestador: 'Funerária F', status: 'zeloInforma', observacoes: [] },
            { numeroVegas: '2002', cpfTitular: '777.777.777-77', nomeTitular: 'Mariana Rocha', nomeFalecido: 'Gustavo Rocha', cidadeEstado: 'Fortaleza/CE', prestador: 'Funerária G', status: 'zeloInforma', observacoes: [] },
            { numeroVegas: '2003', cpfTitular: '888.888.888-88', nomeTitular: 'Roberto Santos', nomeFalecido: 'Camila Santos', cidadeEstado: 'Recife/PE', prestador: 'Funerária H', status: 'zeloInforma', observacoes: [] },
            { numeroVegas: '2004', cpfTitular: '999.999.999-99', nomeTitular: 'Isabela Fernandes', nomeFalecido: 'Lucas Fernandes', cidadeEstado: 'Manaus/AM', prestador: 'Funerária I', status: 'zeloInforma', observacoes: [] },
            { numeroVegas: '2005', cpfTitular: '101.101.101-10', nomeTitular: 'Gabriel Martins', nomeFalecido: 'Laura Martins', cidadeEstado: 'Brasília/DF', prestador: 'Funerária J', status: 'zeloInforma', observacoes: [] },

            // Atendimentos finalizados
            { numeroVegas: '3001', cpfTitular: '202.202.202-20', nomeTitular: 'Felipe Gonçalves', nomeFalecido: 'Beatriz Gonçalves', cidadeEstado: 'Florianópolis/SC', prestador: 'Funerária K', status: 'finalizado', observacoes: [] },
            { numeroVegas: '3002', cpfTitular: '303.303.303-30', nomeTitular: 'Daniela Barbosa', nomeFalecido: 'Rafael Barbosa', cidadeEstado: 'Vitória/ES', prestador: 'Funerária L', status: 'finalizado', observacoes: [] },
            { numeroVegas: '3003', cpfTitular: '404.404.404-40', nomeTitular: 'Thiago Ribeiro', nomeFalecido: 'Vanessa Ribeiro', cidadeEstado: 'Goiânia/GO', prestador: 'Funerária M', status: 'finalizado', observacoes: [] },
            { numeroVegas: '3004', cpfTitular: '505.505.505-50', nomeTitular: 'Larissa Cardoso', nomeFalecido: 'Eduardo Cardoso', cidadeEstado: 'Campo Grande/MS', prestador: 'Funerária N', status: 'finalizado', observacoes: [] },
            { numeroVegas: '3005', cpfTitular: '606.606.606-60', nomeTitular: 'Bruno Nunes', nomeFalecido: 'Amanda Nunes', cidadeEstado: 'Cuiabá/MT', prestador: 'Funerária O', status: 'finalizado', observacoes: [] },
        ];

        // Salva os atendimentos no localStorage
        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
    }

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

    // Carregar atendimentos ao abrir a página
    function carregarAtendimentos() {
        atendimentos.forEach(atendimento => {
            atualizarTabela(atendimento);
        });
    }

    // Carrega os atendimentos ao abrir a página
    carregarAtendimentos();
});