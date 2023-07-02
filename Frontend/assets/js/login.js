// Arquivo: login.js

document.getElementById('btn-login').addEventListener('click', login);

async function login() {
  const User = new user(); // Certifique-se de que a classe seja escrita corretamente (com a primeira letra em maiúsculo)
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  console.log(username, password);
  try {
    const Data = await User.login(username, password);
    const responseData = Data.login
    if (typeof responseData === 'string') {
      alert(responseData);
    } else if (responseData.error === true) {
      alert(responseData.message);
    } else {
      const token = responseData.token;
      const sessionEnd = responseData.valid_at;
      const { name, email, profile,id, image_path,is_suspended  } = responseData.user;
      console.log(responseData)
      if (is_suspended) {
        alert('Usuário suspenso. Entre em contato com o administrador do sistema.');
        window.location.href = 'contact.html';
      }

      // Armazenar os valores no localStorage
      localStorage.setItem('sessionEnd', sessionEnd);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      localStorage.setItem('name', name);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('profile', profile);
      localStorage.setItem('image_path', image_path);
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error('Erro ao realizar o login:', error);
    alert('Erro ao realizar o login. Verifique o console para mais informações.');
  }
}
