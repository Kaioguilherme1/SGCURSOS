// Arquivo: login.js

document.getElementById('btn-login').addEventListener('click', login);

async function login() {
  const User = new user(); // Certifique-se de que a classe seja escrita corretamente (com a primeira letra em maiúsculo)
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const Data = await User.login(username, password);
    const responseData = Data.login
    console.log(responseData)
    if (typeof responseData === 'string') {
      console.log(responseData);
      alert(responseData);
    } else if (responseData.error === true) {
      console.log(responseData.message);
      alert(responseData.message);
    } else {
      const token = responseData.token;
      const { name, email, profile,id, image_path } = responseData.user;

      // Armazenar os valores no localStorage
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
    console.log('Erro ao realizar o login:', error);
    alert('Erro ao realizar o login. Verifique o console para mais informações.');
  }
}
