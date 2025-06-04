<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Configurações</title>
  <link rel="stylesheet" href="style.css">
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
        <li><a href="#" onclick="sair(); toggleMenu()">Sair</a></li>
      </ul>
    </nav>

    <main class="conteudo">
      <div class="config-container">
        <div class="foto-usuario">
          <img src="http://localhost/meu-projeto/Projeto%20Integrador/Imagens/adriano.jpg" alt="Foto do Usuário">
        </div>
        <h2 class="nome-usuario">Adriano Cilhos Doimo</h2>

        <div class="config-opcao">
            <label for="notificacoes-toggle">Notificações:</label>
            <label class="switch">
              <input type="checkbox" id="notificacoes-toggle">
              <span class="slider"></span>
            </label>
          </div>          

        <button class="botao-suporte">Entrar em Contato com o Suporte</button>
      </div>
    </main>
  </div>

  <script src="script.js"></script>
</body>
</html>
