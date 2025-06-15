<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Calendário - Participante</title>
  <link rel="icon" type="image/png" href="logo.jpg">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <button class="botao-menu" onclick="toggleMenu()">☰</button>
  <div class="layout">
    <nav class="menu-lateral">
      <h3>Menu</h3>
      <ul>
        <li><a href="index.php"> </a></li>
        <li><a href="calendario.php">Calendário</a></li>
        <li><a href="relatorios.php">Relatórios</a></li>
        <li><a href="configuracoes.php">Configurações</a></li>
        <li><a href="sobre.php">Sobre</a></li>
        <li><a href="#" onclick="sair(); toggleMenu()">Sair</a></li>
      </ul>
    </nav>

    <main class="conteudo">
      <div class="painel-principal">

        <!-- Tabela de eventos -->
        <div class="eventos-lado">
          <h3>Próximos Eventos</h3>
          <table class="tabela-eventos">
            <thead>
              <tr>
                <th>Data</th>
                <th>Vaga</th>
                <th>Turno</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody id="corpo-tabela-eventos">
              <!-- Os dados da tabela serão inseridos dinamicamente com JS -->
            </tbody>
          </table>
        </div>

        <!-- Calendário -->
        <div class="container-calendario">
          <div class="controle-mes">
            <button onclick="mudarMes(-1)">◀</button>
            <h2 id="titulo-mes">Março 2025</h2>
            <button onclick="mudarMes(1)">▶</button>
          </div>

          <div class="calendario" id="calendario"></div>
        </div>

      </div>
    </main>
  </div>

  <div class="container">
    <h1>Buscar Eventos</h1>
    
    <!-- Formulário para buscar eventos -->
    <form method="POST">
      <label for="data">Selecione a Data:</label>
      <input type="date" name="data" id="data" required>
      <button type="submit">Buscar</button>
    </form>

    <div id="resultados">
      <!-- Aqui serão exibidos os eventos -->
    </div>
  </div>
  <script src="script.js"></script>

</body>
</html>
