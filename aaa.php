<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Buscar Eventos</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
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

  <?php
    // Verificar se foi enviado um formulário
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      // Captura a data fornecida
      $dataSelecionada = $_POST['data'];

      // Configuração de conexão com o banco de dados
      $servername = "localhost";
      $username = "root";
      $password = "";
      $dbname = "ArenaVinci";

      // Criando a conexão
      $conn = new mysqli($servername, $username, $password, $dbname);

      // Verificando a conexão
      if ($conn->connect_error) {
          die("Conexão falhou: " . $conn->connect_error);
      }

      // Consulta no banco de dados
      $sql = "SELECT * FROM eventos WHERE data = '$dataSelecionada'";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
        // Exibe os eventos encontrados
        echo "<h3>Eventos Encontrados:</h3><ul>";
        while($row = $result->fetch_assoc()) {
          echo "<li>Vaga: " . $row['vaga'] . " - Turno: " . $row['turno'] . "</li>";
        }
        echo "</ul>";
      } else {
        echo "<p>Nenhum evento encontrado para esta data.</p>";
      }

      // Fechando a conexão
      $conn->close();
    }
  ?>

</body>
</html>
