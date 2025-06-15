function entrar(event) {
  event.preventDefault();

  const cpf = document.getElementById("cpf").value.trim().replace(/\D/g, ""); // remove pontuação
  const senha = document.getElementById("senha").value;

  if (!/^\d{11}$/.test(cpf)) {
    alert("CPF deve conter 11 dígitos numéricos.");
    return;
  }

  if (!senha) {
    alert("Preencha a senha.");
    return;
  }

  // Redirecionamento com base no CPF
  if (cpf === "11122233344") {
    window.location.href = "calendario.php"; // Administrador
  } else {
    window.location.href = "calendario-participante.php"; // Qualquer outro usuário
  }
}

// Variáveis globais de controle de mês
let mesAtual = 5;
let anoAtual = 2025;

const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Função para carregar o calendário com os eventos
// Função para carregar o calendário com os eventos
function carregarCalendario() {
  const calendario = document.getElementById("calendario");
  calendario.innerHTML = ""; // Limpa o conteúdo do calendário

  document.getElementById("titulo-mes").textContent = `${nomesMeses[mesAtual]} ${anoAtual}`; // Atualiza o título do mês

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  diasSemana.forEach(dia => {
    const div = document.createElement("div");
    div.className = "cabecalho";
    div.textContent = dia;
    calendario.appendChild(div);
  });

  const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay(); // Primeiro dia do mês
  const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate(); // Total de dias do mês

  for (let i = 0; i < primeiroDia; i++) {
    calendario.appendChild(document.createElement("div"));
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const div = document.createElement("div");
    div.className = "dia";

    const dataStr = `${anoAtual}-${(mesAtual + 1).toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}`; // Formato de data
    div.innerHTML = `<div>${dia}</div>`;

    // Verifica se o dia tem algum evento
    fetch(`buscar_eventos.php?data=${dataStr}`)
      .then(response => response.json())
      .then(eventos => {
        if (eventos.length > 0) {
          div.style.backgroundColor = "#FF7417";  // Verde
          div.style.color = "white"; // Muda a cor do texto para branco
        }
      })
      .catch(error => console.error("Erro ao buscar eventos:", error));

    div.addEventListener("click", function() {
      buscarEventos(dataStr); // Buscar eventos para o dia selecionado
    });

    calendario.appendChild(div);
  }
}

function buscarEventos(data) {
  // Faz a requisição para o PHP para buscar os eventos
  fetch(`buscar_eventos.php?data=${data}`)
    .then(response => response.json())
    .then(eventos => {
      if (eventos.length > 0) {
        // Exibir eventos encontrados
        adicionarEventoNaTabela(data, eventos);
      } else {
        alert("Nenhum evento encontrado para esta data.");
      }
    })
    .catch(error => console.error("Erro ao buscar eventos:", error));
}

function adicionarEventoNaTabela(data, eventos) {
  const corpoTabela = document.getElementById("corpo-tabela-eventos");
  corpoTabela.innerHTML = ""; // Limpa a tabela antes de adicionar novos eventos

  eventos.forEach(evento => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatarData(data)}</td>
      <td>${evento.vaga}</td>
      <td>${evento.turno}</td>
    `;
    corpoTabela.appendChild(tr);
  });
}

function formatarData(dataStr) {
  const [ano, mes, dia] = dataStr.split("-");
  return `${dia}/${mes}`;
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("calendario")) {
    carregarCalendario();
  }
});

function buscarEventos(data) {
  // Faz uma requisição AJAX para buscar os eventos do banco
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "buscar_eventos.php?data=" + data, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const eventos = JSON.parse(xhr.responseText); // Supondo que a resposta seja um JSON com os eventos
      exibirEventos(eventos);
    }
  };
  xhr.send();
}

function exibirEventos(eventos) {
  const corpoTabela = document.getElementById("corpo-tabela-eventos");
  corpoTabela.innerHTML = ""; // Limpa a tabela antes de adicionar novos eventos

  if (eventos.length === 0) {
    corpoTabela.innerHTML = "<tr><td colspan='3'>Nenhum evento encontrado para esta data.</td></tr>";
  } else {
    eventos.forEach(evento => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${evento.data}</td>
        <td>${evento.vaga}</td>
        <td>${evento.turno}</td>
      `;
      corpoTabela.appendChild(tr);
    });
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

function formatarData(dataStr) {
  const [ano, mes, dia] = dataStr.split("-");
  return `${dia}/${mes}`;
}

function sair() {
  window.location.href = "login.php";
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

function adicionarEventoParaParticipante(data, descricao) {
  const corpoTabela = document.getElementById("corpo-tabela-eventos");
  corpoTabela.innerHTML = "";

  if (Array.isArray(descricao)) {
    descricao.forEach(desc => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${formatarData(data)}</td>
        <td>${desc}</td>
        <td><button onclick="candidatar('${data}', '${desc}')">Tenho interesse</button></td>
      `;
      corpoTabela.appendChild(tr);
    });
  } else {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatarData(data)}</td>
      <td>${descricao}</td>
      <td><button onclick="candidatar('${data}', '${descricao}')">Tenho interesse</button></td>
    `;
    corpoTabela.appendChild(tr);  
  }
}

// Função para exibir o formulário de candidatura
// Função chamada ao clicar no botão "Quero Participar"
function candidatar(data, vaga) {
  // Exibe o formulário de candidatura para participantes
  const formulario = document.getElementById("formulario-candidatura");
  formulario.style.display = "block";  // Faz o formulário aparecer

  // Preenche automaticamente a data e a vaga selecionada
  document.getElementById("data-candidatura").value = data;
  document.getElementById("vaga-candidatura").value = vaga;

}

// Enviar formulário (aqui você pode implementar a lógica de salvar no banco de dados ou mostrar uma mensagem de sucesso)
document.getElementById("form-candidatura").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = document.getElementById("data-candidatura").value;
  const vaga = document.getElementById("vaga-candidatura").value;
  const turno = document.getElementById("turno").value;

  alert(`Candidatura para ${vaga} no dia ${data} no turno ${turno} registrada com sucesso!`);

  // Após submeter, você pode esconder o formulário novamente
  document.getElementById("formulario-candidatura").style.display = "none";
});


// Função para exibir o formulário de adicionar evento
function exibirFormularioAdicionarEvento(data) {
  // Exibe o formulário
  const form = document.getElementById("formulario-evento");
  form.style.display = "block";

  // Preenche o campo de data automaticamente
  document.getElementById("data").value = data;

  // Faz o formulário rolar até o topo
  form.scrollIntoView({ behavior: "smooth" });
}

// Função para adicionar evento na tabela de eventos
function adicionarEventoNaTabela(data, descricao) {
  const corpoTabela = document.getElementById("corpo-tabela-eventos");
  corpoTabela.innerHTML = "";

  descricao.forEach((desc) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatarData(data)}</td>
      <td>${desc}</td>
    `;
    corpoTabela.appendChild(tr);
  });
}


// Envio do formulário para salvar o evento no banco de dados
document.getElementById("form-cadastro").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita o comportamento padrão de envio

  const data = document.getElementById("data").value;
  const vaga = document.getElementById("evento").value;
  const turno = document.getElementById("turno").value;

  // Envia os dados do formulário para o arquivo PHP
  const formData = new FormData();
  formData.append('data_evento', data);
  formData.append('vaga_evento', vaga);
  formData.append('turno_evento', turno);

  fetch('salvar_evento.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    alert("Evento adicionado com sucesso!");
    // Após o envio, recarregar o calendário para refletir o novo evento
    carregarCalendario();
    document.getElementById("formulario-evento").style.display = "none";
  })
  .catch(error => {
    console.error("Erro ao adicionar evento: ", error);
  });
});

function carregarEventos() {
  const corpoTabela = document.getElementById("corpo-tabela-eventos");
  corpoTabela.innerHTML = ""; // Limpar a tabela antes de adicionar novos eventos

  eventos.forEach(evento => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${evento.data}</td>
      <td>${evento.vaga}</td>
      <td>${evento.turno}</td>
      <td><button onclick="participar('${evento.data}', '${evento.vaga}')">Eu Quero</button></td>
    `;
    corpoTabela.appendChild(tr);
  });
}

// Função de participação
function participar(data, vaga) {
  alert(`Você se candidatou para o evento de ${vaga} no dia ${data}.`);
}

// Carregar eventos na página
window.addEventListener("DOMContentLoaded", carregarEventos);