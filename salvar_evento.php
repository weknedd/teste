<?php
// Conectar ao banco de dados (ajustar conforme a sua configuração no XAMPP)
$servername = "localhost";
$username = "root";  // Usuário padrão no XAMPP
$password = "";      // Senha padrão no XAMPP
$dbname = "arenavinci"; // Nome do banco de dados

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificando a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Recebe os dados do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $evento = $_POST['evento'];
    $data_evento = $_POST['data_evento'];
    $vagas = $_POST['vagas'];
    $turno_evento = $_POST['turno_evento'];

    // SQL para inserir o evento na tabela 'eventos'
    $sql = "INSERT INTO eventos (data, vaga, turno) VALUES ('$data_evento', '$evento', '$turno_evento')";

    if ($conn->query($sql) === TRUE) {
        echo "Novo evento registrado com sucesso!";
    } else {
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }
}

// Fechar a conexão
$conn->close();
?>
