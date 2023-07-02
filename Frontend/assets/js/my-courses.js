
let progress_time = 0;
let register = 0;
let courseBody = document.getElementById('course-body')

function updateProgress() {
  const checkboxes = document.querySelectorAll('.form-check-input');
  const totalCheckboxes = checkboxes.length;
  let completedCheckboxes = 0;

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      completedCheckboxes++;
    }

    // Marcar/desmarcar os checkboxes de acordo com o progresso
    checkbox.checked = index < Math.floor((progress_time / 100) * totalCheckboxes);
  });

  // Calcular o novo progresso
  progress_time = Math.floor((completedCheckboxes / totalCheckboxes) * 100);

  // Atualizar o valor do progresso na página
  // document.getElementById('progress').innerHTML = progress_time + '%';
  console.log(progress_time)
}

async function saveProgress() {
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    const User = new user(id, token)
    const response = await User.editRegister(register, {"progress_time": progress_time})
    alert(response.message)
    window.location.reload()
}
async function renderCourse(id, token, progress, register_id) {
    progress_time = progress
    register = register_id
    // Insere o conteúdo renderizado no container
    let courseInfo = document.getElementById('course-info')



    const course = new Course(id, token)

    const courseJson = await course.get(false, id, null, [], null, false)
    let {name, description, duration_hours, Category, tags, lessons} = courseJson.courses[0].course
    let participants = courseJson.courses[0].participants
    let enrolled_count = participants.length

    let courseHTML = `
               <div class="row" style="background: linear-gradient(to right, #478bd1, #71c7ec); border-radius: 10px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);">
                  <div class="row">
                    <h1 class="pb-3" id="course-title" style="text-align: left; color: white;">${name}</h1>
                  </div>
                  <div class="row align-items-start">
                    <div class="col">
                      <p style="color: white;" id="course-ch">Carga Horária: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${duration_hours} horas</span></p>
                    </div>
                    <div class="col">
                      <p style="color: white;" id="course-enrolled_count">Matriculados Atualmente: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${enrolled_count} alunos</span></p>
                    </div>
                  </div>
              </div>

              <div class="row align-items-start pt-3">
                <div class="col" id="course-category"><a type="button" class="btn btn-dark" href="courses.html?category=${Category.name}"> ${Category.name}</a></div>
                <div class="col" id="course-tags">${tags.map(tag => `<a href="courses.html?tags=${tag}" type="button" class="btn btn-outline-primary btn-sm" style="margin: 4px">${tag}</a>`).join('')}</div>
              </div>

              <div class="row align-items-start pt-3" style="background-color: #f8f9fa; border-radius: 5px; padding: 10px;">
                <div class="col">
                  <p class="mb-4" id="course-description" style="color: #333;">${description}</p>
                  <p class="mb-2" style="color: #555;">Os tópicos abordados no curso incluem:</p>
                  <ul class="list-group list-group-flush list-group-numbered text-start" id="course-lessons">
                      ${lessons.map((lesson, index) => `
                                <li class="list-group-item" style="display: flex; align-items: center;">
                                    <div class="form-check" style="display: flex; align-items: center;">
                                      <input class="form-check-input" type="checkbox" value="" id="lesson-${index}" style="margin-left: 1px;" onclick="updateProgress()">
                                      <label class="form-check-label" for="lesson-${index}">
                                        ${lesson}
                                      </label>
                                    </div>
                                </li>
                      `).join('')}
                  </ul>
                  <p class="mt-4" style="color: #333;">
                      Neste curso, você terá a oportunidade de aprimorar suas habilidades e conhecimentos em um ambiente prático e dinâmico.
                      Explore os conceitos fundamentais, desenvolva projetos interessantes e aprenda com exemplos do mundo real.
                      Este curso oferece uma abordagem abrangente e interativa para garantir que você
                      obtenha uma compreensão sólida dos tópicos abordados.</p>
                </div>
              </div>
              <div class="row align-items-end pt-3" style="margin-bottom: 20px">
                    <div class="col text-start" id="btn-end"></div>
                    <div class="col text-end">
                      <button type="button" class="btn btn-success" onclick="saveProgress()">Salvar</button>
                    </div>
              </div>        
    `
    courseInfo.innerHTML = courseHTML
    updateProgress();
}

async function renderRegisters() {
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    const User = new user(id, token)
    const response = await User.getRegister(null, id)
    const registers = response.registration
    console.log(registers)

    courseBody.innerHTML += `
            <div class="accordion" id="accordionPanelsStayOpenExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    Cursos Matriculados
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" >
                  <div class="accordion-body">
                    <div class="row" >
                        ${registers.map(register => `
                          <div class="row mt-3 justify-content-center" style="background-color: transparent; border-bottom: 1px solid #2787ff; margin: 5px; padding: 5px;">
                            <div class="col align-self-center">
                              <h5>${register.Course.name}</h5>
                              <a>N° de Matricula: <span class="badge text-bg-primary" style="font-weight: bold; padding: 2px 6px; border-radius: 4px;">${register.id.toString().padStart(8, '0')}</span></a>
                              </div>
                            <div class="col align-self-center">
                              <h6>Progresso</h6>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: ${register.progress_time}%" aria-valuenow="${register.progress_time}" aria-valuemin="0" aria-valuemax="100">${register.progress_time}%</div>
                                </div>    
                            </div>
                            <div class="col align-self-center" id="final-grade-${register.id}">
                              <h6>Nota Final</h6>
                              ${register.final_grade === null ? '<h5><span class="badge bg-secondary">Não avaliado</span></h5>' : `<h5><span class="badge ${register.final_grade < 5 ? 'text-bg-danger' : (register.final_grade >= 5 && register.final_grade < 7) ? 'text-bg-warning' : (register.final_grade >= 7 && register.final_grade < 8) ? 'text-bg-primary' : 'text-bg-success'}">${register.final_grade}</span></h5>`}
                              </div>
                            <div class="col text-end align-self-center">
                              ${register.Certificate === null ? '' : `<img class="btn-icon" href="course.html?id=${register.id}" id="btn-view-${register.id}" src="assets/icons/certificate-dev-96.png" alt="Ver Certificado" width="35" height="35" title="Ver certificado" style="margin: 4px" onclick="(() => {window.location.href = 'certificate.html?code=${register.Certificate.validate_code}'})()">`}
                              <img class="btn-icon" id="btn-edit-${register.id}" src="assets/icons/document-104.png" alt="Ver-curso" width="35" height="35" title="Ver curso" style="margin: 4px" onclick="renderCourse(${register.Course_id}, '${token}', ${register.progress_time}, ${register.id})">
                            </div>
                          </div>
                        
                        `).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `
}

window.onload = async function() {
    await renderRegisters()
};