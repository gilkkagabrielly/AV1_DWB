const tarefas = [];
const form = document.querySelector("#formTarefa");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefas");
const mensagem = document.querySelector("#mensagemErro");

function validarTarefa(texto) {
    if (!texto || texto.trim() === "") {
        mensagem.textContent = "A tarefa não pode estar vazia.";
        return false;
    }
    mensagem.textContent = "";
    return true;
}

function renderTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = tarefa;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.style.marginLeft = "10px";

        btnEditar.addEventListener("click", () => {
            const inputEditar = document.createElement("input");
            inputEditar.type = "text";
            inputEditar.value = tarefa;

            const btnSalvar = document.createElement("button");
            btnSalvar.textContent = "Salvar";

            const btnCancelar = document.createElement("button");
            btnCancelar.textContent = "Cancelar";
            btnCancelar.style.marginLeft = "5px";

            li.innerHTML = "";
            li.appendChild(inputEditar);
            li.appendChild(btnSalvar);
            li.appendChild(btnCancelar);

            btnSalvar.addEventListener("click", () => {
                if (validarTarefa(inputEditar.value)) {
                    tarefas[index] = inputEditar.value.trim();
                    renderTarefas();
                }
            });

            btnCancelar.addEventListener("click", () => {
                renderTarefas();
            });
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.style.marginLeft = "5px";

        btnExcluir.addEventListener("click", () => {
            tarefas.splice(index, 1);
            renderTarefas();
        });

        li.appendChild(span);
        li.appendChild(btnEditar);
        li.appendChild(btnExcluir);

        lista.appendChild(li);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const texto = input.value;

    if (!validarTarefa(texto)) return;

    tarefas.push(texto.trim());
    input.value = "";
    renderTarefas();
});