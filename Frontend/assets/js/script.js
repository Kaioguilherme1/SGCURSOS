


function search() {
  const term = document.getElementById('search-input').value;
  const termList = [];
    termList.push(term);
  window.location.href = `courses.html?tags=${termList}&category=${termList}&course=${termList}`;
}

// Verifica o estado de login ao carregar a página

window.addEventListener('DOMContentLoaded', function() {

  let isLoggedIn = localStorage.getItem('isLoggedIn');
  let accountType = localStorage.getItem('profile');
  const username = localStorage.getItem('username');

  if (isLoggedIn === 'true') {

    if (accountType === 'admin' || accountType === 'root') {
      showLoggedInAdmin(username);
      document.getElementById('btn-logout').addEventListener('click', function(event) {
        event.preventDefault();
        logout();
      });

    } else if (accountType === 'student') {
        showLoggedInUser(username);
      document.getElementById('btn-logout').addEventListener('click', function(event) {
        event.preventDefault();
        logout();
      });
    } else {
      console.warn('Tipo de conta desconhecido');
    }
  } else {
    showLoggedOutState();
  }
});


// Função para exibir o estado de login
function showLoggedInAdmin(username) {
  let userProfile = document.querySelector('.user-profile');
  userProfile.innerHTML = `
    <img src="assets/img/blank-profile.png" alt="Foto de Perfil" class="profile-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
    <a href="#" class="profile-link" style="margin-left: 5px">${username}</a>
    <span class="badge bg-danger" style="margin-left: 5px">Admin</span>
    <div class="dropdown-menu-profile">
      <ul>
        <li><a href="edit.html" class="dropdown-link">Perfil</a></li>
        <li><a href="courses.html?admin=true" class="dropdown-link">cursos</a></li>
        <li><a href="users.html" class="dropdown-link">Usuarios</a></li>
        <li><a href="#" class="dropdown-link">Configurações</a></li>
        <li><a id="btn-logout" class="dropdown-link" >Logout</a></li>
      </ul>
    </div>
  `;
}

function showLoggedInUser(username) {
  let userProfile = document.querySelector('.user-profile');
  userProfile.innerHTML = `
    <img src="assets/img/blank-profile.png" alt="Foto de Perfil" class="profile-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
    <a href="#" class="profile-link" style="margin-left: 5px">${username}</a>
    <div class="dropdown-menu-profile">
      <ul>
        <li><a href="edit.html" class="dropdown-link">Perfil</a></li>
        <li><a href="my-courses.html" class="dropdown-link">Meus cursos</a></li>
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
// Função para confim

function ConfirmModal() {
  const modal = document.getElementById('confirmationModal');
  const confirmBtn = document.getElementById('confirmBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmationText = document.getElementById('confirmationText');

  confirmationText.textContent = 'Tem certeza que deseja criar o curso?';

  return new Promise((resolve, reject) => {
    confirmBtn.addEventListener('click', function () {
      modal.style.display = 'none';
      resolve(true);
    });

    cancelBtn.addEventListener('click', function () {
      modal.style.display = 'none';
      resolve(false);
    });

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  });
}




// Função para fazer logout
function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}