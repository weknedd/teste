<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Sobre</title>
  <link rel="icon" type="image/png" href="icone.png">
  <link rel="stylesheet" href="style.css">

  <!-- Link para o Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
  <button class="botao-menu" onclick="toggleMenu()">☰</button>
<div class="overlay"></div>
  <div class="layout">
    <nav class="menu-lateral">
      <br>
      <h3>Menu</h3>
      <ul>
        <li><a href="calendario.php">Calendário</a></li>
        <li><a href="relatorios.php">Relatórios</a></li>
        <li><a href="configuracoes.php">Configurações</a></li>
        <li><a href="sobre.php">Sobre</a></li>
        <li><a href="login.php">Sair</a></li>
      </ul>
    </nav>

    <main class="conteudo">
      <h1>Sobre</h1>
      <div class="cards-sobre">
        <div class="card" onclick="abrirDescricao('projeto')">
          <img src="http://localhost/meu-projeto/Projeto%20Integrador/Imagens/clab.jpg" alt="Foto do Projeto">
          <h3>ABCLabs Consultoria</h3>
        </div>
        <div class="card" onclick="abrirDescricao('dev1')">
          <img src="http://localhost/meu-projeto/Projeto%20Integrador/Imagens/ariel.jpeg" alt="Desenvolvedor 1">
          <h3>Ariel da Silva Alves</h3>
        </div>
        <div class="card" onclick="abrirDescricao('dev2')">
          <img src="http://localhost/meu-projeto/Projeto%20Integrador/Imagens/brenda.jpg" alt="Desenvolvedor 2">
          <h3>Brenda Cristina de Souza</h3>
        </div>
        <div class="card" onclick="abrirDescricao('dev3')">
          <img src="http://localhost/meu-projeto/Projeto%20Integrador/Imagens/chrystian.jpg" alt="Desenvolvedor 3">
          <h3>Chrystian Mauricio Carvalho Oliveira</h3>
        </div>
        <div class="card" onclick="abrirDescricao('dev4')">
          <img src="http://localhost/meu-projeto/Projeto%20Integrador/Imagens/larissa.jpg" alt="Desenvolvedor 4">
          <h3>Larissa Semede Ferreira</h3>
        </div>
        <div class="card" onclick="abrirDescricao('arena')">
          <img src="http://localhost/meu-projeto/Projeto%20Integrador/Imagens/Logo_azul.jpg" alt="Arena Vinci">
          <h3>Arena Vinci</h3>
        </div>
      </div>

      <div class="descricao-card" id="descricao-card">
        <h2 id="titulo-descricao"></h2>
        <p id="texto-descricao"></p>
        <div class="links-dev" id="links-dev"></div>
      </div>
    </main>
  </div>
  <script src="script.js"></script>
</body>
</html>
