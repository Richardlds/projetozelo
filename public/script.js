document.addEventListener("DOMContentLoaded", function () {
    const abas = document.querySelectorAll(".abaLink");
    const conteudos = document.querySelectorAll(".abaConteudo");
    const modal = document.querySelector("#modal");
    const abrirModalBtn = document.querySelector("#abrirModal");
    const fecharModalBtn = document.querySelector(".fecharModal");
    const form = document.querySelector("#formAtendimento");
    const API_URL = 'https://projetozelo.onrender.com'; // URL do backend

    // Função para renderizar a tabela de uma aba
    function renderizarTabela(aba, dados) {
        const tbody = document.querySelector(`#${aba} tbody`);
        tbody.innerHTML = ""; // Limpa o conteúdo atual

        dados.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.numeroVegas}</td>
                <td>${item.cpfTitular}</td>
                <td>${item.nomeTitular}</td>
                <td>${item.nomeFalecido}</td>
                <td>${item.cidadeEstado}</td>
                <td>${item.prestador}</td>
            `;
            tbody.appendChild(row);

            // Adiciona o evento de clique para redirecionar para detalhes
            row.addEventListener("click", function () {
                const numeroVegas = row.cells[0].textContent;
                window.location.href = `detalhes.html?numeroVegas=${numeroVegas}`;
            });
        });
    }

    // Função para carregar os atendimentos
    async function carregarAtendimentos() {
        try {
            console.log('Iniciando requisição para buscar atendimentos...'); // Log para depuração
            const response = await fetch(`${API_URL}/atendimentos`);
            console.log('Resposta recebida:', response); // Log para depuração

            if (!response.ok) {
                const errorData = await response.json(); // Captura a mensagem de erro do backend
                console.error('Erro na resposta:', errorData); // Log para depuração
                throw new Error(errorData.error || 'Erro ao buscar atendimentos');
            }

            const data = await response.json();
            console.log('Dados recebidos:', data); // Log para depuração

            renderizarTabela("emAndamento", data.filter(item => item.status === 'emAndamento'));
            renderizarTabela("zeloInforma", data.filter(item => item.status === 'zeloInforma'));
            renderizarTabela("finalizado", data.filter(item => item.status === 'finalizado'));
        } catch (error) {
            console.error('Erro ao buscar atendimentos:', error); // Log detalhado do erro
            alert('Erro ao buscar atendimentos. Verifique o console para mais detalhes.');
        }
    }

    // Inicializa as tabelas
    carregarAtendimentos();

    // Troca de abas
    abas.forEach(aba => {
        aba.addEventListener("click", function () {
            abas.forEach(a => a.classList.remove("active"));
            conteudos.forEach(c => c.classList.remove("active"));

            const abaSelecionada = this.getAttribute("data-aba");
            this.classList.add("active");
            document.getElementById(abaSelecionada).classList.add("active");
        });
    });

    // Abrir modal ao clicar no botão
    abrirModalBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Fechar modal ao clicar no botão de fechar
    fecharModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Fechar modal ao clicar fora da área da modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Adicionar atendimento ao enviar o formulário
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const novoAtendimento = {
            numeroVegas: document.getElementById("numeroVegas").value,
            cpfTitular: document.getElementById("cpfTitular").value,
            nomeTitular: document.getElementById("nomeTitular").value,
            nomeFalecido: document.getElementById("nomeFalecido").value,
            cidadeEstado: document.getElementById("cidadeEstado").value,
            prestador: document.getElementById("prestador").value,
            status: document.getElementById("status").value
        };

        try {
            // Verifica se o número Vegas já existe
            const response = await fetch(`${API_URL}/atendimentos`);
            if (!response.ok) {
                throw new Error('Erro ao buscar atendimentos');
            }
            const data = await response.json();
            const existe = data.some(item => item.numeroVegas === novoAtendimento.numeroVegas);
            if (existe) {
                alert("Atendimento com este N° Vegas já existe!");
                return;
            }

            // Se não existir, envia o novo atendimento
            const postResponse = await fetch(`${API_URL}/atendimentos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoAtendimento)
            });

            if (!postResponse.ok) {
                throw new Error('Erro ao adicionar atendimento');
            }

            alert("Atendimento adicionado com sucesso!");
            carregarAtendimentos(); // Atualiza a tabela
            form.reset(); // Limpa o formulário
            modal.style.display = "none"; // Fecha a modal
        } catch (error) {
            console.error('Erro ao adicionar atendimento:', error);
            alert("Erro ao adicionar atendimento. Verifique o console para mais detalhes.");
        }
    });

    // Filtro de pesquisa
    const campoPesquisa = document.getElementById("campoPesquisa");
    campoPesquisa.addEventListener("input", function () {
        const termo = this.value.trim();
        const tabela = document.querySelector(".abaConteudo.active table tbody");
        const linhas = tabela.getElementsByTagName("tr");

        for (let linha of linhas) {
            const celulas = linha.getElementsByTagName("td");
            let encontrou = false;

            for (let celula of celulas) {
                if (celula.textContent.toLowerCase().includes(termo.toLowerCase())) {
                    encontrou = true;
                    break;
                }
            }

            linha.style.display = encontrou ? "" : "none";
        }
    });
});