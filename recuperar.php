<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Recuperar Senha</title>
  <link rel="icon" type="image/png" href="icone.png">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="login-container">
    <div class="login-box">
      <img src="http://localhost/meu-projeto/Projeto%20Integrador/Imagens/logo_branca.jpg" alt="Logo da Empresa" class="logo">
      <h2>Recuperar Senha</h2>
      <form onsubmit="solicitarReset(event)">
        <input type="text" id="cpf-reset" placeholder="CPF cadastrado" required minlength="11" maxlength="11">
        <input type="email" id="email-reset" placeholder="E-mail cadastrado" required>
        <button type="submit">Solicitar reset de senha</button>
        <a href="login.php" class="link-voltar">Sair</a>
      </form>
    </div>
  </div>

  <script>

  </script>
<script src="script.js"></script>
</body>
</html>
