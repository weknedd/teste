function entrar(event) {
  event.preventDefault();

  const cpf = document.getElementById("cpf").value.trim();
  const senha = document.getElementById("senha").value;

  if (!/^\d{11}$/.test(cpf)) {
    alert("CPF deve conter 11 dígitos numéricos.");
    return;
  }

  if (!senha) {
    alert("Preencha a senha.");
    return;
  }

  // ✅ Aqui é onde ele tenta abrir o calendário:
  window.location.href = "calendario.html";
}
// Eventos cadastrados
const eventos = {
  "2025-04-05": "Caixa",
  "2025-04-12": ["Segurança", "Cozinha", "Estoque"],
  "2025-04-25": ["Segurança", "Cozinha", "Estoque"]
};

// Variáveis globais de controle de mês
let mesAtual = 3; // Março (0 = janeiro)
let anoAtual = 2025;

const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function carregarCalendario() {
  const calendario = document.getElementById("calendario");
  calendario.innerHTML = "";

  document.getElementById("titulo-mes").textContent = `${nomesMeses[mesAtual]} ${anoAtual}`;

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  diasSemana.forEach(dia => {
    const div = document.createElement("div");
    div.className = "cabecalho";
    div.textContent = dia;
    calendario.appendChild(div);
  });

  const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
  const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();

  for (let i = 0; i < primeiroDia; i++) {
    calendario.appendChild(document.createElement("div"));
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const div = document.createElement("div");
    div.className = "dia";

    const dataStr = `${anoAtual}-${(mesAtual + 1).toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}`;
    div.innerHTML = `<div>${dia}</div>`;

    const hoje = new Date();
    const dataHojeStr = `${hoje.getFullYear()}-${(hoje.getMonth() + 1).toString().padStart(2, "0")}-${hoje.getDate().toString().padStart(2, "0")}`;
    if (dataStr === dataHojeStr) {
      div.classList.add("dia-hoje");
    }

    if (eventos[dataStr]) {
      const icone = document.createElement("div");
      icone.className = "icone-evento";
      icone.textContent = "🟢";
      div.appendChild(icone);
    }

    div.addEventListener("click", () => {
      const evento = eventos[dataStr];
      if (evento) {
        adicionarEventoNaTabela(dataStr, evento);
      } else {
        alert("Nenhum evento para esta data.");
      }
    });

    calendario.appendChild(div);
  }
}

function mudarMes(direcao) {
  mesAtual += direcao;
  if (mesAtual < 0) {
    mesAtual = 11;
    anoAtual--;
  } else if (mesAtual > 11) {
    mesAtual = 0;
    anoAtual++;
  }
  carregarCalendario();
}

function adicionarEventoNaTabela(data, descricao) {
  const corpoTabela = document.getElementById("corpo-tabela-eventos");
  corpoTabela.innerHTML = "";

  if (Array.isArray(descricao)) {
    descricao.forEach(desc => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${formatarData(data)}</td><td>${desc}</td>`;
      corpoTabela.appendChild(tr);
    });
  } else {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${formatarData(data)}</td><td>${descricao}</td>`;
    corpoTabela.appendChild(tr);
  }
}

function formatarData(dataStr) {
  const [ano, mes, dia] = dataStr.split("-");
  return `${dia}/${mes}`;
}

function sair() {
  window.location.href = "login.html";
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("calendario")) {
    carregarCalendario();
  }
});

