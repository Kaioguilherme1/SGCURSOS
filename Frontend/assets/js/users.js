

async function toggleAdmin(id, profile) {
  const token = localStorage.getItem('token');
  const User = new user(id, token);

  if (profile === 'admin' && confirm('Deseja realmente remover a permissão de administrador deste usuario?')) {
    const response = await User.edit({ profile: 'student' });
    if (response.response !== undefined){
        alert("Permissão de administrador removida com sucesso!")
       window.location.reload();
    }

  }else if (profile === 'student' && confirm('Deseja realmente conceder a permissão de administrador a este usuario?')) {
    const response = await User.edit({ profile: 'admin' });
    if (response.response !== undefined){
        alert("Permissão de administrador concedida com sucesso!")
        window.location.reload();
    }

  }
}

async function toggleSuspension(id, is_suspended) {
  const token = localStorage.getItem('token');
  const User = new user(id, token);

  if (is_suspended === true && confirm('Deseja realmente remover a suspensão deste usuario?')) {
    const response = await User.edit({is_suspended: false});
    if (response.response !== undefined) {
      alert("Suspensão removida com sucesso!")
      window.location.reload();
    }
  }else if (is_suspended === false && confirm('Deseja realmente suspender este usuario?')) {
    const response = await User.edit({is_suspended: true});
    if (response.response !== undefined) {
      alert("Usuario suspenso com sucesso!")
      window.location.reload();
    }
  }
}
async function renderUsers() {

  let usersHeader = document.getElementById('users-header');
  let usersContainer = document.getElementById('users-container');
  let pagination = document.getElementById('pagination');
  const token = localStorage.getItem('token');
  const User = new user(null, token);
  const response = await User.getAll();
  const users = response.users;
  users.sort((a, b) => a.name.localeCompare(b.name));
  console.log(users);

  try {
    if (users.length === 0) {
      let noCoursesCardHTML = `
        <div class="row vh-100 justify-content-center align-items-center">
          <div class="card" style="width: 40rem;">
            <div class="card-body">
              <h5 class="card-title">Nenhum usuario encontrado</h5>
              <p class="card-text">Desculpe, não há usuarios cadastrados no momento.</p>
            </div>
          </div>
        </div>
      `;
      usersHeader.insertAdjacentHTML('beforeend', noCoursesCardHTML);
    }else{

      let filtersHTML = `
        <div class="row mt-3 justify-content-center " style="background-color: transparent">
          <div class="col d-flex justify-content-center align-items-center text-center" style="background-color: transparent">
            <div class="card" style="width: 100rem; background-color: transparent; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <div class="card-body" style="background-color: transparent">
                <h1 class="card-title"> Usuarios Cadastrados </h1>
                <ul class="list-unstyled">
                </ul>
                <p class="card-text">Total de usuarios encontrados: <span class="badge bg-info">${users.length}</span></p>
              </div>
            </div>
          </div>
        </div>
      `;

      usersHeader.insertAdjacentHTML('afterbegin', filtersHTML);

      const url = new URL(window.location.href);
      const page = url.searchParams.get("page");
      const itemsPerPage = 20;
      const totalPages = Math.ceil(users.length / itemsPerPage);

      if (page < 1 || page > totalPages) {
        return;
      }

      const startIndex = (page - 1) * itemsPerPage;
      let endIndex = page * itemsPerPage;
      if (endIndex > users.length) {
        endIndex = users.length;
      }
      pagination.innerHTML= `
        <li class="page-item ${page === 1 ? 'disabled' : ''}">
          <a class="page-link" onclick="previousPage()" style="cursor: pointer">Previous</a>
        </li>
        ${parseInt(page) > 2 ? `<li class="page-item"><a class="page-link" href="users.html?page=${parseInt(page)-2}">${parseInt(page)-2}</a></li>` : ''}
        ${parseInt(page) > 1 ? `<li class="page-item"><a class="page-link" href="users.html?page=${parseInt(page)-1}">${parseInt(page)-1}</a></li>` : ''}
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="#">${page}</a>
        </li>
        ${parseInt(page) + 1 <= parseInt(totalPages) ? `<li class="page-item"><a class="page-link" href="users.html?page=${parseInt(page)+1}">${parseInt(page)+1}</a></li>` : ''}
        ${parseInt(page) + 2 < parseInt(totalPages) ? `<li class="page-item"><a class="page-link" href="users.html?page=${parseInt(page)+2}">${parseInt(page)+2}</a></li>` : ''}
        <li class="page-item"><a class="page-link" href="users.html?page=${parseInt(totalPages)}">...${parseInt(totalPages)}</a></li>
        <li class="page-item">
          <a class="page-link" onclick="nextPage()" style="cursor: pointer">Next</a>
        </li>

      `

      users.slice(startIndex, endIndex).forEach(function (user_unit) {
        let CardHTML = `
          <div class="row mt-3 justify-content-center" style="background-color: transparent; border-bottom: 1px solid #2787ff; margin: 5px; padding: 5px;">
            <div class="col align-self-center" style="min-width: 40%">
              <h5>${user_unit.name}</h5>
              <a class="btn btn-outline-primary" href="mailto:${user_unit.email}">${user_unit.email}</a>
            </div>
            <div class="col d-flex align-items-center">
              <h6>Desde: ${new Date(user_unit.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</h6>
            </div>
            <div class="col align-self-center">
              <h6>Permissão: ${user_unit.profile === 'admin' ? '<badge class="badge text-bg-warning">Administrador</badge>' : '<badge class="badge text-bg-primary">Usuário</badge>'}</h6>
              <h6>Conta:  ${user_unit.is_suspended === true ? '<badge class="badge text-bg-danger">Suspensa</badge>' : '<badge class="badge text-bg-success">Ativa</badge>'}</h6>
              
            </div>
            <div class="col text-end align-self-center">
              <img class="btn-icon" id="btn-admin-${user_unit.id}" src="${user_unit.profile === 'admin' ? 'assets/icons/key-96-warn.png' : 'assets/icons/key-96-success.png'}" alt="Editar" width="35" height="35" title="Mudar Permissão" style="margin: 4px" onclick="event.preventDefault(); (async () => { await toggleAdmin(${user_unit.id}, '${user_unit.profile}'); })()">
              <img class="btn-icon" id="btn-suspend-${user_unit.id}" src="${user_unit.is_suspended === true ? 'assets/icons/Locked-user-64-danger.png' : 'assets/icons/customer-64.png'}" alt="Deletar" width="35" height="35" title="Alterna Suspensão" style="margin: 4px" onclick="event.preventDefault(); (async () => { await toggleSuspension(${user_unit.id}, ${user_unit.is_suspended}); })()">
            </div>
          </div>
        `;

      usersContainer.insertAdjacentHTML('beforeend', CardHTML);
      });
    }
  } catch (error) {
    console.error(error);
  }
}


let page = 1;

function nextPage() {
    page++;
    window.location.href = `users.html?page=${page}`;
}

function previousPage() {
  if (page > 1) {
    page--;
    window.location.href = `users.html?page=${page}`;
  }
}

window.onload = async function() {
    let url = new URL(window.location.href);
    let actualPage = url.searchParams.get("page");
  if (actualPage !== undefined) {
    page = actualPage;
  }
    await renderUsers();
};