
const API_URL = "https://sistema-eventos-backend-uuws.onrender.com";

const listaEventos = document.getElementById("listaEventos");
const formulario = document.getElementById("formEvento");
const mensagem = document.getElementById("mensagem");

async function carregarEventos() {
    listaEventos.textContent = "Carregando eventos...";

    try {
        const resposta = await fetch(`${API_URL}/eventos`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar eventos.");
        }

        const eventos = await resposta.json();

        listaEventos.innerHTML = "";

        if (eventos.length === 0) {
            listaEventos.textContent = "Nenhum evento cadastrado.";
            return;
        }

        eventos.forEach(evento => {
            const div = document.createElement("div");
            div.className = "evento";

            const titulo = document.createElement("h3");
            titulo.textContent = evento.titulo;

            const descricao = document.createElement("p");
            descricao.textContent = evento.descricao || "Sem descrição.";

            const data = document.createElement("p");
            data.textContent = `Data: ${evento.data_evento}`;

            const local = document.createElement("p");
            local.textContent = `Local: ${evento.local}`;

            div.append(titulo, descricao, data, local);
            listaEventos.appendChild(div);
        });

    } catch (erro) {
        listaEventos.textContent = "Não foi possível carregar os eventos.";
        console.error(erro);
    }
}

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const novoEvento = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        data_evento: document.getElementById("data_evento").value,
        local: document.getElementById("local").value
    };

    try {
        const resposta = await fetch(`${API_URL}/eventos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoEvento)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || "Erro ao cadastrar evento.");
        }

        mensagem.textContent = "Evento cadastrado com sucesso!";
        mensagem.style.color = "green";

        formulario.reset();
        carregarEventos();

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.style.color = "red";
    }
});

carregarEventos();
