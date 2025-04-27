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

function toggleFormularioEvento() {
  const form = document.getElementById("formulario-evento");
  const botao = document.getElementById("botao-toggle-form");

  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
    botao.textContent = "×"; // muda o botão para X
    form.scrollIntoView({ behavior: "smooth" });
  } else {
    form.style.display = "none";
    botao.textContent = "+";
  }
}

function toggleMenu() {
  const menu = document.querySelector(".menu-lateral");
  const botao = document.querySelector(".botao-menu");
  const overlay = document.querySelector(".overlay");
  const body = document.body; // novo

  menu.classList.toggle("aberto");
  body.classList.toggle("menu-aberto"); // novo

  if (menu.classList.contains("aberto")) {
    botao.textContent = "✖";
    overlay.classList.add("ativo");
  } else {
    botao.textContent = "☰";
    overlay.classList.remove("ativo");
  }
}


// Fecha o menu clicando fora
document.addEventListener("click", function(event) {
  const menu = document.querySelector(".menu-lateral");
  const botao = document.querySelector(".botao-menu");
  const overlay = document.querySelector(".overlay");

  if (menu.classList.contains("aberto")) {
    if (!menu.contains(event.target) && !botao.contains(event.target)) {
      menu.classList.remove("aberto");
      botao.textContent = "☰";
      overlay.classList.remove("ativo");
    }
  }
});

const descricoes = {
  projeto: {
    titulo: 'ABCLabs Consultoria',
    texto: 'A ABCLabs Consultoria é uma empresa que atua na área de tecnologia, oferecendo soluções inovadoras para o mercado. O projeto desenvolvido pela equipe tem como foco a criação de um sistema de gerenciamento de eventos, visando facilitar a organização e o controle de atividades em empresas e instituições. Através de um calendário dinâmico e interativo, os usuários poderão visualizar, adicionar e gerenciar eventos de forma prática e eficiente.',
    links: ''
  },
  dev1: {
    titulo: 'Ariel da Silva Alves',
    texto: 'Um dos pilares da equipe, com uma sólida formação em Desenvolvimento de Software e uma paixão por criar soluções inovadoras. Ele é o responsável pela arquitetura do sistema, garantindo que o software seja robusto, seguro e escalável. Com experiência em diversas linguagens de programação e frameworks, Ariel lidera a parte técnica do projeto, orientando os membros do time na implementação das funcionalidades mais complexas. Sua habilidade em análise de sistemas e seu comprometimento com a qualidade técnica fazem dele um integrante indispensável na CLAB Consultoria.',
    links: `
      <a href="https://www.linkedin.com/in/ariel-s-alves-715a97268/" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a> |
      <a href="mailto:ariel.alves@fatec.sp.gov.br"><i class="fas fa-envelope"></i> E-mail</a>
    `
  },
  dev2: {
    titulo: 'Brenda Cristina de Souza',
    texto: 'Traz para o projeto sua experiência em gestão de projetos e análise de negócios. Ele é o responsável por entender as necessidades do cliente e traduzir essas demandas em requisitos técnicos claros. Chrystian coordena as etapas do desenvolvimento, mantendo o time focado nos objetivos do projeto e assegurando que os prazos e a qualidade sejam cumpridos. Sua habilidade de comunicação e organização são essenciais para o sucesso do projeto, além de ser um elo importante entre a CLAB Consultoria e a Arena Vinci.',
    links: `
      <a href="https://www.linkedin.com/in/brenda-cristina2607/" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a> |
      <a href="mailto:brenda.souza16@fatec.sp.gov.br"><i class="fas fa-envelope"></i> E-mail</a>
    `
  },
  dev3: {
    titulo: 'Chrystian Mauricio Carvalho Oliveira',
    texto: 'É o especialista em banco de dados e integração de sistemas. Ela é responsável por garantir que todas as informações no software sejam armazenadas de maneira eficiente, segura e acessível. Além disso, Larissa trabalha para integrar o software com outras plataformas e sistemas utilizados pela Arena Vinci, garantindo que as operações fluam sem interrupções. Com seu conhecimento profundo em SQL e otimização de banco de dados, Larissa assegura que o sistema seja capaz de lidar com grandes volumes de dados e transações, mantendo a performance do sistema em alta.',
    links: `
      <a href="https://www.linkedin.com/in/chrystianoliveira/" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a> |
      <a href="mailto:chrystian.oliveira@fatec.sp.gov.br"><i class="fas fa-envelope"></i> E-mail</a>
    `
  },
  dev4: {
    titulo: 'Larissa Semede Ferreira',
    texto: 'É a especialista em UX/UI do time, responsável pela criação de interfaces intuitivas e agradáveis aos usuários. Com uma visão focada na experiência do usuário, ela trabalha para garantir que o software seja fácil de usar, mesmo para aqueles com pouca familiaridade com tecnologia. Larissa realiza pesquisas de usabilidade, prototipa telas e colabora com o desenvolvimento de interações, sempre com o objetivo de otimizar a experiência do usuário final. Sua criatividade e atenção aos detalhes fazem dela a líder na parte de design do projeto.',
    links: `
      <a href="https://www.linkedin.com/in/larissa-semede-3a4935272/" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a> |
      <a href="mailto:larissa.ferreira21@fatec.sp.gov.br"><i class="fas fa-envelope"></i> E-mail</a>
    `
  },
  arena: {
    titulo: 'Arena Vinci',
    texto: 'Arena Vinci Esportes é um espaço moderno e acolhedor, dedicado à prática de atividades esportivas, recreativas e eventos. Com estrutura completa e atendimento de excelência, a Arena Vinci busca promover qualidade de vida, lazer e integração social, atendendo públicos de todas as idades. Nosso compromisso é oferecer experiências únicas em um ambiente seguro, dinâmico e preparado para o seu bem-estar.',
    links: `
      <a href="https://www.linkedin.com/in/larissa-semede-3a4935272/" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a> |
      <a href="mailto:larissa.ferreira21@fatec.sp.gov.br"><i class="fas fa-envelope"></i> E-mail</a>
    `
  }
};

function abrirDescricao(id) {
const titulo = document.getElementById('titulo-descricao');
const texto = document.getElementById('texto-descricao');
const descricaoCard = document.getElementById('descricao-card');

titulo.textContent = descricoes[id].titulo;
texto.textContent = descricoes[id].texto;

// Mostra o card se estava oculto
descricaoCard.style.display = 'block';

descricaoCard.scrollIntoView({ behavior: 'smooth' });
}