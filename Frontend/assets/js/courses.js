
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
        let {name, tags, description, ch, id} = course;

        let courseCardHTML = `
          <div class="col d-flex justify-content-center align-items-center" style="padding: 10px;">
            <div class="card" style="width: 25rem;">
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
                    <span class="badge bg-secondary">CH ${ch} h</span>
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


async function getCourses() {
  let urlParams = new URLSearchParams(window.location.search);
  let tagsSearch = [urlParams.get('tags')];
  if (tagsSearch[0] === null) tagsSearch.pop();
  let categorySearch = urlParams.get('category');
  let courseSearch = urlParams.get('course');
  const courses = new Course()
  const coursesJson = await courses.get(false, null, courseSearch, tagsSearch, categorySearch, false)
  const coursesList = coursesJson.courses
  console.log(coursesList)
  renderCourses(coursesList);
}

window.onload =async function() {
  // Aqui você chama a função renderCourses e passa a lista de cursos
    await getCourses()
};