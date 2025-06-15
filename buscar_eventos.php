<?php
// Conectar ao banco de dados (ajuste conforme sua configuração)
$servername = "localhost";
$username = "root"; // Usuário padrão no XAMPP
$password = ""; // Senha padrão no XAMPP
$dbname = "arenavinci"; // Nome do banco de dados

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificando a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Recebendo a data via GET
$data = $_GET['data'];

// Consulta para buscar eventos pela data
$sql = "SELECT * FROM eventos WHERE data = '$data'";
$result = $conn->query($sql);

$eventos = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $eventos[] = $row;
    }
}

// Fechar a conexão
$conn->close();

// Retornar os eventos em formato JSON
echo json_encode($eventos);
?>