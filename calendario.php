<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Calendário</title>
  <link rel="icon" type="image/png" href="icone.png">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <button class="botao-menu" onclick="toggleMenu()">☰</button>
  <div class="overlay"></div>

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

        <!-- Bloco 1: Eventos -->
        <div class="eventos-lado">
          <h3>Próximos Eventos</h3>
          <table class="tabela-eventos">
            <thead>
              <tr>
                <th>Data</th>
                <th>Vaga</th>
                <th>Turno</th>
              </tr>
            </thead>
            <tbody id="corpo-tabela-eventos"></tbody>
          </table>  
        </div>

        <!-- Bloco 2: Calendário -->
        <div class="container-calendario">
          <div class="controle-mes">
            <button onclick="mudarMes(-1)">◀</button>
            <h2 id="titulo-mes">Março 2025</h2>
            <button onclick="mudarMes(1)">▶</button>
          </div>

          <div class="calendario" id="calendario"></div>

          <div class="adicionar-evento">
            <button id="botao-toggle-form" onclick="toggleFormularioEvento()" class="botao-mais">+</button>
          </div>
        </div>  

        <!-- Formulário de Lançamento de Evento -->
        <div class="form-wrapper" id="formulario-evento" style="display: none;">
          <h3>Adicionar Novo Evento</h3>
          <form id="form-cadastro" class="form-evento" method="POST" action="salvar_evento.php">
            <label for="evento">Nome do Evento:</label>
            <select id="evento" name="evento" required>
              <option value="Cozinha">Cozinha</option>
              <option value="Segurança">Segurança</option>
              <option value="Caixa">Caixa</option>
              <option value="Limpeza">Limpeza</option>
            </select>

            <label for="data">Data do Evento:</label>
            <input type="date" id="data" name="data" required>

            <label for="vagas">Quantidade de Vagas:</label>
            <select id="vagas" name="vagas" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <label for="turno">Selecione o turno:</label>
            <select id="turno" name="turno" required>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="O dia todo">O dia todo</option>
            </select>

            <button type="submit">Adicionar Evento</button>
          </form>
        </div>

      </div>
    </main>
  </div>

  <script src="script.js"></script>
</body>
</html>
