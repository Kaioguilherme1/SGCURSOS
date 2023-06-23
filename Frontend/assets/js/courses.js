

let token = localStorage.getItem("token");
const courseApi = new Course(null, token);

function renderCourses(courses) {
  console.log("Renderizando cursos...");
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
      console.log("Nenhum curso encontrado!")
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
        let {name, tags, description, duration_hours, id} = course;

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
                      ${tags.map(tag => `<a href="courses.html?tags=${tag}" type="button" class="btn btn-outline-primary btn-sm">${tag}</a>`).join('')}
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
  console.log("Renderizando cursos Admin...");
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
      console.log("Nenhum curso encontrado!")
      let noCoursesCardHTML = `
        <div class="row vh-100 justify-content-center align-items-center">
          <div class="card" style="width: 40rem;">
            <div class="card-body">
              <h5 class="card-title">Nenhum curso encontrado</h5>
              <p class="card-text">Desculpe, não há cursos disponíveis no momento.</p>
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
        let {name, tags, participants, duration_hours, id} = course;
        const numParticipants = participants.length;
        let courseCardHTML = `
          <div class="row mt-3 justify-content-center" style="background-color: transparent; border-bottom: 1px solid #2787ff; margin: 5px; padding: 5px;">
            <div class="col align-self-center">
              <h5>${name}</h5>
              <a>Carga Horária: <span class="badge text-bg-primary" style="font-weight: bold; padding: 2px 6px; border-radius: 4px;">${duration_hours} horas</span></a>
              <a>N° Alunos: <span class="badge text-bg-primary" style="font-weight: bold; padding: 2px 6px; border-radius: 4px;">${numParticipants} Alunos</span></a>
            </div>
            <div class="col d-flex align-items-center">
              <a> Tags: ${tags.map(tag => `<a href="courses.html?tags=${tag}" style="margin: 4px" type="button" class="btn btn-outline-primary btn-sm">${tag}</a>`).join('')}</a>
            </div>
            <div class="col text-end align-self-center">
              <img class="btn-icon" href="course.html?id=${id}" id="btn-view-${id}" src="assets/icons/document-104.png" alt="Ver curso" width="35" height="35" title="Ver" style="margin: 4px">
              <img class="btn-icon" id="btn-edit-${id}" src="assets/icons/edit-104.png" alt="Editar" width="35" height="35" title="Editar" style="margin: 4px">
              <img class="btn-icon" id="btn-delete-${id}" src="assets/icons/trash-96.png" alt="Deletar" width="35" height="35" title="Deletar" style="margin: 4px">
            </div>
          </div>
        `;

      coursesContainer.insertAdjacentHTML('beforeend', courseCardHTML);

      // Função dos botões de ação
      // const btnEdit = document.getElementById("btn-edit-${id}");
      const btnDelete = document.getElementById("btn-delete-${id}");

      // btnEdit.addEventListener("click", function () {
      //   console.log("Editando curso...");
      // });

      btnDelete.addEventListener("click", function () {
         const responseData =  courseApi.delete(id);
      });
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
  const coursesList = coursesJson.courses
  console.log(coursesList)

  console.log([admin, accountType])
  if (admin === 'true' && (accountType === 'admin' || accountType === 'root')) {
    renderCoursesAdmin(coursesList);
  } else{
    renderCourses(coursesList);
  }

}

window.onload =async function() {
  // Aqui você chama a função renderCourses e passa a lista de cursos
    await getCourses()
};
