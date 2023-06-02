
// Verifica o estado de login ao carregar a página

window.addEventListener('DOMContentLoaded', function() {

  let isLoggedIn = localStorage.getItem('isLoggedIn');
  let accountType = localStorage.getItem('profile');
  const username = localStorage.getItem('username');

  if (isLoggedIn === 'true') {

    console.log('Usuário logado');
    console.log('Tipo de conta:', accountType);

    if (accountType === 'admin') {
      showLoggedInAdmin(username);
      console.log('Tipo de conta: admin');
      document.getElementById('btn-logout').addEventListener('click', function(event) {
        event.preventDefault();
        logout();
      });

    } else if (accountType === 'aluno') {
        showLoggedInUser(username);
      console.log('Tipo de conta: aluno');
      document.getElementById('btn-logout').addEventListener('click', function(event) {
        event.preventDefault();
        logout();
      });
    } else {
      console.log('Tipo de conta desconhecido');
    }
  } else {
    showLoggedOutState();
  }
});


// Função para exibir o estado de login
function showLoggedInAdmin(username) {
  let userProfile = document.querySelector('.user-profile');
  userProfile.innerHTML = `
    <img src="assets/img/blank-profile.png" alt="Foto de Perfil" class="profile-icon">
    <a href="#" class="profile-link">${username}</a>
    <div class="dropdown-menu">
      <ul>
        <li><a href="#" class="dropdown-link">Perfil</a></li>
        <li><a href="#" class="dropdown-link">cursos</a></li>
        <li><a href="#" class="dropdown-link">alunos</a></li>
        <li><a href="#" class="dropdown-link">Configurações</a></li>
        <li><a id="btn-logout" class="dropdown-link" >Logout</a></li>
      </ul>
    </div>
  `;
}

function showLoggedInUser(username) {
  let userProfile = document.querySelector('.user-profile');
  userProfile.innerHTML = `
    <img src="assets/img/blank-profile.png" alt="Foto de Perfil" class="profile-icon">
    <a href="#" class="profile-link">${username}</a>
    <div class="dropdown-menu">
      <ul>
        <li><a href="#" class="dropdown-link">Perfil</a></li>
        <li><a href="#" class="dropdown-link">Meus cursos</a></li>
        <li><a href="#" class="dropdown-link">Meus certificados</a></li>
        <li><a href="#" class="dropdown-link">Configurações</a></li>
        <li><a href="#" id="btn-logout" class="dropdown-link" >Logout</a></li>
      </ul>
    </div>
  `;
}

// Função para exibir o estado de logout
function showLoggedOutState() {
  let userProfile = document.querySelector('.user-profile');
  userProfile.innerHTML = `
      <a href="login.html" class="button-login">Login</a>
      <a href="register.html" class="button-register">cadastra-se</a>
  `;
}

// Função para fazer logout
function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}