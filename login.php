<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <link rel="icon" type="image/png" href="icone.png">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="login-container">
    <div class="login-box">
   
        
      <img src="http://localhost/meu-projeto/Projeto%20Integrador/Imagens/logo_branca.jpg" alt="Logo da Empresa" class="logo">
   
     
   
      <h2 class="login-title">Login</h2>

      <form onsubmit="entrar(event)">
        <input type="text" id="cpf" placeholder="CPF" required minlength="11" maxlength="11">
        <input type="password" id="senha" placeholder="Senha">
        <button type="submit">Entrar</button>
      </form>
      <a href="recuperar.php" class="esqueci-senha">Esqueci minha senha</a>
    </div>
  </div>
</div>

  <script src="script.js"></script>
</body>
</html>
