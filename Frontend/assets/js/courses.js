
function renderCourses(courses) {
  console.log("Renderizando cursos...");

  // Seleciona o elemento onde os cursos serão renderizados
  let coursesContainer = document.getElementById("courses-container");

  // Limpa o conteúdo atual
  coursesContainer.innerHTML = "";

  // Itera sobre cada curso na lista
  courses.forEach(function (course) {
    // Extrai os dados do JSON do curso
    let { title, tags, description,  ch, id } = course;

    // Cria a string de template com as variáveis
    let courseCardHTML = `
      <div class="col d-flex justify-content-center align-items-center" style="padding: 10px;">
        <div class="card" style="width: 25rem;">
          <img src="assets/img/banner.png" class="card-img-top" alt="...">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col">
                <h5 class="card-title">${title}</h5>
              </div>
              <div class="col d-flex justify-content-center">
                <div class="d-flex flex-wrap justify-content-center">
                  ${tags.map(tag => `<button type="button" class="btn btn-outline-info btn-sm">${tag}</button>`).join('')}
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

    // Insere o conteúdo renderizado no container
    coursesContainer.insertAdjacentHTML('beforeend', courseCardHTML);
  });
}

var courses = [
  {
    title: "Curso de Python",
    tags: ["Python", "Programação", "Desenvolvimento"],
    description: "Aprenda Python de forma prática e eficiente.",
    ch: 40,
    id: 1
  },
  {
    title: "Curso de JavaScript",
    tags: ["JavaScript", "Front-end", "Web"],
    description: "Desenvolva habilidades em JavaScript para criar aplicativos web interativos.",
    ch: 30,
    id: 2
  },
  {
    title: "Curso de HTML e CSS",
    tags: ["HTML", "CSS", "Web Design"],
    description: "Aprenda a criar páginas web usando HTML e CSS.",
    ch: 20,
    id: 3
  },
  {
    title: "Curso de React",
    tags: ["React", "Front-end", "Framework"],
    description: "Explore o poder do React para construir interfaces de usuário modernas.",
    ch: 35,
    id: 4
  }
];

document.addEventListener("DOMContentLoaded", function() {
  // Aqui você chama a função renderCourses e passa a lista de cursos
  renderCourses(courses);
});

window.onload = function() {
  // Aqui você chama a função renderCourses e passa a lista de cursos
  renderCourses(courses);
};