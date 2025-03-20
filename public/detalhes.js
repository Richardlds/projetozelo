document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const numeroVegas = urlParams.get("numeroVegas");

    // Verifica se o número Vegas foi passado na URL
    if (!numeroVegas) {
        alert("Número Vegas não encontrado na URL.");
        window.location.href = "index.html";
        return;
    }

    // Busca os detalhes do atendimento
    fetch(`http://localhost:3000/atendimentos/${numeroVegas}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar atendimento.");
            }
            return response.json();
        })
        .then(atendimento => {
            if (atendimento.error) {
                alert(atendimento.error);
                window.location.href = "index.html";
                return;
            }

            // Preenche o formulário com os dados do atendimento
            document.getElementById("numeroVegas").value = atendimento.numeroVegas;
            document.getElementById("cpfTitular").value = atendimento.cpfTitular;
            document.getElementById("nomeTitular").value = atendimento.nomeTitular;
            document.getElementById("nomeFalecido").value = atendimento.nomeFalecido;
            document.getElementById("cidadeEstado").value = atendimento.cidadeEstado;
            document.getElementById("prestador").value = atendimento.prestador;
            document.getElementById("status").value = atendimento.status;

            // Carrega as observações (se houver)
            const listaObservacoes = document.getElementById("listaObservacoes");
            if (atendimento.observacoes) {
                atendimento.observacoes.forEach(obs => {
                    const li = document.createElement("li");
                    li.textContent = obs;
                    listaObservacoes.appendChild(li);
                });
            }

            // Adiciona uma nova observação
            document.getElementById("adicionarObservacao").addEventListener("click", function () {
                const observacao = document.getElementById("observacoes").value;
                if (observacao) {
                    fetch(`http://localhost:3000/atendimentos/${numeroVegas}/observacoes`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ observacao })
                    })
                    .then(response => response.json())
                    .then(data => {
                        const li = document.createElement("li");
                        li.textContent = observacao;
                        listaObservacoes.appendChild(li);
                        document.getElementById("observacoes").value = "";
                    })
                    .catch(error => {
                        console.error('Erro ao adicionar observação:', error);
                    });
                }
            });

            // Salva as alterações no atendimento
            document.getElementById("editarAtendimento").addEventListener("submit", function (event) {
                event.preventDefault();

                const dadosAtualizados = {
                    cpfTitular: document.getElementById("cpfTitular").value,
                    nomeTitular: document.getElementById("nomeTitular").value,
                    nomeFalecido: document.getElementById("nomeFalecido").value,
                    cidadeEstado: document.getElementById("cidadeEstado").value,
                    prestador: document.getElementById("prestador").value,
                    status: document.getElementById("status").value
                };

                fetch(`http://localhost:3000/atendimentos/${numeroVegas}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosAtualizados)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao atualizar atendimento.");
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Atendimento atualizado com sucesso!");
                    window.location.href = "index.html";
                })
                .catch(error => {
                    console.error('Erro ao atualizar atendimento:', error);
                    alert("Erro ao atualizar atendimento. Verifique o console para mais detalhes.");
                });
            });

            // Modal de confirmação para deletar
            const modalConfirmacao = document.getElementById("modalConfirmacao");
            const btnDeletar = document.getElementById("deletarAtendimento");
            const btnConfirmarDelecao = document.getElementById("confirmarDelecao");
            const btnCancelarDelecao = document.getElementById("cancelarDelecao");

            // Abre o modal de confirmação
            btnDeletar.addEventListener("click", function () {
                modalConfirmacao.style.display = "flex";
            });

            // Cancela a deleção
            btnCancelarDelecao.addEventListener("click", function () {
                modalConfirmacao.style.display = "none";
            });

            // Confirma a deleção
            btnConfirmarDelecao.addEventListener("click", function () {
                fetch(`http://localhost:3000/atendimentos/${numeroVegas}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao excluir atendimento.");
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Atendimento excluído com sucesso!");
                    window.location.href = "index.html";
                })
                .catch(error => {
                    console.error('Erro ao excluir atendimento:', error);
                    alert("Erro ao excluir atendimento. Verifique o console para mais detalhes.");
                });
            });
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do atendimento:', error);
            alert("Erro ao carregar detalhes do atendimento.");
            window.location.href = "index.html";
        });
});