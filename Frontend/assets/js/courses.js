
let token = localStorage.getItem("token");
const courseApi = new Course(null, token);

async function deleteCourse(id) {
    // Exibe uma mensagem de confirmação e solicita a confirmação do usuário
    const confirmed = confirm("Tem certeza de que deseja deletar este curso?");

    if (confirmed) {
        console.log("Deletando curso: " + id);
        let responseDelete = await courseApi.delete(id);
        if (responseDelete.error === true) {
            console.warn("Erro ao deletar curso!");
            alert(responseDelete.message);
            console.error(responseDelete.message);
        } else {
            alert("Curso deletado com sucesso!");
            location.reload();
        }
    } else {
        console.log("Operação de exclusão cancelada pelo usuário.");
    }
}

function renderCourses(courses) {
  // Seleciona o elemento onde os cursos serão renderizados
  let coursesContainer = document.getElementById("courses-container");
  let headerContainer = document.getElementById("header-courses");

  // Obtém os parâmetros da URL
  let urlParams = new URLSearchParams(window.location.search);
  let tagsSearch = [urlParams.get('tags')];
  if (tagsSearch[0] === null) tagsSearch.pop();
  let categorySearch = urlParams.get('category');

  // Limpa o conteúdo atual
  coursesContainer.innerHTML = "";
  try {
    if (courses.length === 0) {
      let noCoursesCardHTML = `
        <div class="row vh-100 justify-content-center align-items-center">
          <div class="col d-flex justify-content-center align-items-center text-center">
            <div class="card" style="width: 40rem;">
              <div class="card-body">
                <h5 class="card-title">Nenhum curso encontrado</h5>
                <p class="card-text">Desculpe, não há cursos disponíveis no momento.</p>
              </div>
            </div>
          </div>
        </div>
      `;
      headerContainer.insertAdjacentHTML('beforeend', noCoursesCardHTML);
    }else{
      let numCourses = courses.length;
      // Cria a string de template com as variáveis
      let filtersHTML = `
        <div class="row mt-3 justify-content-center " style="background-color: transparent">
          <div class="col d-flex justify-content-center align-items-center text-center" style="background-color: transparent">
            <div class="card" style="width: 100rem; background-color: transparent; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <div class="card-body" style="background-color: transparent">
                <h1 class="card-title"> Cursos Disponiveis </h1>
                <ul class="list-unstyled">
                  ${tagsSearch.length !== 0 ? `<li>Tags: ${tagsSearch.map(tag => `<span class="badge bg-primary">${tag}</span>`).join('')}</li>` : ''}
                  ${categorySearch !== null ? `<li>Categorias: <span class="badge bg-secondary">${categorySearch}</span></li>` : ''}
                </ul>
                <p class="card-text">Total de cursos encontrados: <span class="badge bg-info">${numCourses}</span></p>
              </div>
            </div>
          </div>
        </div>
      `;
      headerContainer.insertAdjacentHTML('afterbegin', filtersHTML);

      courses.forEach(function (course) {
        // Extrai os dados do JSON do curso
        let {name, tags, description, duration_hours, id} = course.course;

        let courseCardHTML = `
          <div class="col d-flex justify-content-center align-items-center" style="padding: 10px;">
            <div class="card" style="width: 40rem; min-height: 30rem;">
              <img src="assets/img/banner.png" class="card-img-top" alt="...">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col">
                    <h5 class="card-title">${name}</h5>
                  </div>
                  <div class="col d-flex justify-content-center">
                    <div class="d-flex flex-wrap justify-content-center">
                      ${tags.map(tag => `<a href="courses.html?tags=${tag}" type="button" class="btn btn-outline-primary btn-sm" style="margin: 2px">${tag}</a>`).join('')}
                    </div>
                  </div>
                </div>
                <p class="card-text">${description}</p>
                <div class="row text-start">
                  <div class="col">
                    <span class="badge bg-secondary">CH ${duration_hours} h</span>
                  </div>
                  <div class="col text-end">
                    <a href="course.html?id=${id}" class="btn btn-primary text-right">Ver Curso</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      coursesContainer.insertAdjacentHTML('beforeend', courseCardHTML);
      });
    }
    // Insere o conteúdo renderizado no container
  } catch (error) {
    console.error(error);
  }
}

function renderCoursesAdmin(courses) {
  // Seleciona o elemento onde os cursos serão renderizados
  let coursesContainer = document.getElementById("courses-container");
  let headerContainer = document.getElementById("header-courses");
  coursesContainer.classList.remove("row-cols-3")
  // Obtém os parâmetros da URL
  let urlParams = new URLSearchParams(window.location.search);
  let tagsSearch = [urlParams.get('tags')];
  if (tagsSearch[0] === null) tagsSearch.pop();
  let categorySearch = urlParams.get('category');

  // Limpa o conteúdo atual
  coursesContainer.innerHTML = "";
  try {
    if (courses.length === 0) {
      let noCoursesCardHTML = `
        <div class="row vh-100 justify-content-center align-items-center">
          <div class="card" style="width: 40rem;">
            <div class="card-body">
              <h5 class="card-title">Nenhum curso encontrado</h5>
              <p class="card-text">Desculpe, não há cursos disponíveis no momento.</p>
              <button type="button" class="btn btn-primary" style="width: 200px" onclick="(() => {window.location.href = 'edit.html?create=true'})()" >Criar Curso</button>
            </div>
          </div>
        </div>
      `;
      headerContainer.insertAdjacentHTML('beforeend', noCoursesCardHTML);
    }else{
      let numCourses = courses.length;
      // Cria a string de template com as variáveis
      let filtersHTML = `
        <div class="row mt-3 justify-content-center " style="background-color: transparent">
          <div class="col d-flex justify-content-center align-items-center text-center" style="background-color: transparent">
            <div class="card" style="width: 100rem; background-color: transparent; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <div class="card-body" style="background-color: transparent">
                <h1 class="card-title"> Cursos Disponiveis </h1>
                <ul class="list-unstyled">
                  ${tagsSearch.length !== 0 ? `<li>Tags: ${tagsSearch.map(tag => `<span class="badge bg-primary">${tag}</span>`).join('')}</li>` : ''}
                  ${categorySearch !== null ? `<li>Categorias: <span class="badge bg-secondary">${categorySearch}</span></li>` : ''}
                </ul>
                <p class="card-text">Total de cursos encontrados: <span class="badge bg-info">${numCourses}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3 justify-content-end" style="background-color: transparent; border-bottom: 1px solid #2787ff; margin: 5px; padding: 5px;">
           <button type="button" class="btn btn-primary" style="width: 200px" onclick="(() => {window.location.href = 'edit.html?create=true'})()" >Criar Curso</button>
        </div>
      `;
      
      headerContainer.insertAdjacentHTML('afterbegin', filtersHTML);

      courses.forEach(function (course) {
        // Extrai os dados do JSON do curso
        let {name, tags, duration_hours, id, status} = course.course;
        const numParticipants = course.participants.length;
        let courseCardHTML = `
          <div class="row mt-3 justify-content-center" style="background-color: transparent; border-bottom: 1px solid #2787ff; margin: 5px; padding: 5px;">
            <div class="col align-self-center">
              <h5>${name}</h5>
              <a>Carga Horária: <span class="badge text-bg-primary" style="font-weight: bold; padding: 2px 6px; border-radius: 4px;">${duration_hours} horas</span></a>
              <a>N° Alunos: <span class="badge text-bg-primary" style="font-weight: bold; padding: 2px 6px; border-radius: 4px;">${numParticipants} Alunos</span></a>
            </div>
            <div class="col d-flex align-items-center">
              <a> Tags: ${tags.map(tag => `<a href="courses.html?admin=true&&tags=${tag}" style="margin: 4px" type="button" class="btn btn-outline-primary btn-sm">${tag}</a>`).join('')}</a>
            </div>
            <div class="col text-end align-self-center">
              ${status === 'open' ? '<span class="badge bg-success">Aberto</span>' : '<span class="badge bg-danger">Encerrado</span>'}
              <img class="btn-icon" href="course.html?id=${id}" id="btn-view-${id}" src="assets/icons/document-104.png" alt="Ver curso" width="35" height="35" title="Ver" style="margin: 4px" onclick="(() => {window.location.href = 'course.html?id=${id}'})()">
              <img class="btn-icon" id="btn-edit-${id}" src="assets/icons/edit-104.png" alt="Editar" width="35" height="35" title="Editar" style="margin: 4px" onclick="(() => {window.location.href = 'edit.html?course=${id}'})()">
              <img class="btn-icon" id="btn-delete-${id}" src="assets/icons/trash-96.png" alt="Deletar" width="35" height="35" title="Deletar" style="margin: 4px" onclick="deleteCourse(${id})">
            </div>
          </div>
        `;

      coursesContainer.insertAdjacentHTML('beforeend', courseCardHTML);
      });
    }

  } catch (error) {
    console.error(error);
  }
}

async function getCourses() {
  let urlParams = new URLSearchParams(window.location.search);

  let accountType = localStorage.getItem('profile');

  let admin = urlParams.get('admin');
  let tagsSearch = [urlParams.get('tags')];
  let categorySearch = urlParams.get('category');
  let courseSearch = urlParams.get('course');
  if (tagsSearch[0] === null) tagsSearch.pop();


  const coursesJson = await courseApi.get(false, null, courseSearch, tagsSearch, categorySearch, false)


  if (admin === 'true' && (accountType === 'admin' || accountType === 'root')) {
      const coursesList = coursesJson.courses
      renderCoursesAdmin(coursesList);
  } else{
      const coursesList = coursesJson.courses.filter(course => course.course.status === "open");

      renderCourses(coursesList);
  }

}

window.onload =async function() {
  // Aqui você chama a função renderCourses e passa a lista de cursos
    await getCourses()
};
