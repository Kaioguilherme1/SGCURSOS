

async function editGrade(registerId, token) {
  let btnEditGrade = document.getElementById(`btn-edit-${registerId}`);
  let grade = document.getElementById(`final-grade-${registerId}`);

  grade.innerHTML = `<h6>Nota Final</h6> <input type="number" class="form-control" id="input-grade-${registerId}" placeholder="Nota Final" style="margin-left: 25%;width: 50%">`;
  btnEditGrade.src = "assets/icons/check.gif";
  btnEditGrade.setAttribute('onclick', `saveGrade(${registerId}, '${token}')`);

}

async function saveGrade(registerId, token) {
    // Obtenha a nova nota final do campo de input
    let inputGrade = document.getElementById(`input-grade-${registerId}`);
    let newGrade = inputGrade.value;

    // Atualize a nota final do registro
    const User = new user(null, token);
    const response = await User.editRegister(registerId, {"final_grade": newGrade});
    if (response.error){
        alert(response.message);
    }

    // Recarregue a página após salvar
    setTimeout(() => {
    location.reload();
    }, 1000);
}

async function registerCourse() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = [urlParams.get('id')];
    const user_id = localStorage.getItem('id');
    const token = localStorage.getItem('token')
    const User = new user(user_id, token);
    const response = await User.createRegister(id);

    alert(response.registration.message);
    setTimeout(() => {
    location.reload();
    }, 1000)
}

async function endCourse(id, token) {
    const course = new Course(id, token);
    const response = await course.endCourse();
    if (response.error){
        alert(response.message);
    }
    console.log(response)

    setTimeout(() => {
    location.reload();
    }, 1000);
}

async function renderCourse() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = [urlParams.get('id')];
    let token = null
    let profile = null
    try {
        token = localStorage.getItem('token')
        profile = localStorage.getItem('profile')
    }catch (err) {}

    // Insere o conteúdo renderizado no container
    let courseTitle = document.getElementById('course-title')
    let courseDescription = document.getElementById('course-description')
    let courseCh = document.getElementById('course-ch')
    let courseEnrolled_count = document.getElementById('course-enrolled_count')
    let courseCategory = document.getElementById('course-category')
    let courseTags = document.getElementById('course-tags')
    let courseLessons = document.getElementById('course-lessons')
    let courseBody = document.getElementById('course-body')
    let btnEndCourse = document.getElementById('btn-end')
    let btnRegisterCourse = document.getElementById('btn-register')
    const course = new Course(id, token)

    if (profile === null || profile === "student") {
        const courseJson = await course.get(false, id, null, [], null, false)
        let {name, description, duration_hours, Category, tags, lessons} = courseJson.courses[0].course
        let enrolled_count = courseJson.courses[0].participants.length

        courseTitle.innerHTML = name
        courseDescription.innerHTML = description
        courseCh.innerHTML = `Carga Horária: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${duration_hours} horas</span>`
        courseEnrolled_count.innerHTML = `Matriculados Atualmente: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${enrolled_count} alunos</span>`
        courseCategory.innerHTML = `<a type="button" class="btn btn-dark" href="courses.html?category=${Category.name}"> ${Category.name}</a>`
        courseTags.innerHTML = tags.map(tag => `<a href="courses.html?tags=${tag}" type="button" class="btn btn-outline-primary btn-sm" style="margin: 4px">${tag}</a>`).join('')
        courseLessons.innerHTML = lessons.map(lesson => `<li class="list-group-item">${lesson}</li>`).join('')

    }else if ((profile === "admin" || profile === "root") && token !== null) {
        const courseJson = await course.get(false, id, null, [], null, true)
        let {name, description, duration_hours, Category, tags, lessons} = courseJson.courses[0].course
        let participants = courseJson.courses[0].participants
        let enrolled_count = participants.length

        participants.map(participant => `<li class="list-group-item">${participant.name}</li>`).join('')

        console.log(participants)
        courseTitle.innerHTML = name
        courseDescription.innerHTML = description
        courseCh.innerHTML = `Carga Horária: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${duration_hours} horas</span>`
        courseEnrolled_count.innerHTML = `Matriculados Atualmente: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${enrolled_count} alunos</span>`
        courseCategory.innerHTML = `<a type="button" class="btn btn-dark" href="courses.html?category=${Category.name}"> ${Category.name}</a>`
        courseTags.innerHTML = tags.map(tag => `<a href="courses.html?tags=${tag}" type="button" class="btn btn-outline-primary btn-sm" style="margin: 4px">${tag}</a>`).join('')
        courseLessons.innerHTML = lessons.map(lesson => `<li class="list-group-item">${lesson}</li>`).join('')
        btnEndCourse.innerHTML = `<button type="button" class="btn btn-danger" onclick="endCourse('${id}', '${token}')">Encerrar Curso</button>`
        courseBody.innerHTML += `

            <div class="accordion" id="accordionPanelsStayOpenExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    Alunos Matriculados
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" >
                  <div class="accordion-body">
                    <div class="row" >
                        ${participants.map(participant => `
                          <div class="row mt-3 justify-content-center" style="background-color: transparent; border-bottom: 1px solid #2787ff; margin: 5px; padding: 5px;">
                            <div class="col align-self-center">
                              <h5>${participant.User.name}</h5>
                              <a>N° de Matricula: <span class="badge text-bg-primary" style="font-weight: bold; padding: 2px 6px; border-radius: 4px;">${participant.id.toString().padStart(8, '0')}</span></a>
                              </div>
                            <div class="col align-self-center">
                              <h6>Progresso</h6>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: ${participant.progress_time}%" aria-valuenow="${participant.progress_time}" aria-valuemin="0" aria-valuemax="100">${participant.progress_time}%</div>
                                </div>    
                            </div>
                            <div class="col align-self-center" id="final-grade-${participant.id}">
                              <h6>Nota Final</h6>
                              ${participant.final_grade === null ? '<h5><span class="badge bg-secondary">Não avaliado</span></h5>' : `<h5><span class="badge ${participant.final_grade < 5 ? 'text-bg-danger' : (participant.final_grade >= 5 && participant.final_grade < 7) ? 'text-bg-warning' : (participant.final_grade >= 7 && participant.final_grade < 8) ? 'text-bg-primary' : 'text-bg-success'}">${participant.final_grade}</span></h5>`}
                              </div>
                            <div class="col text-end align-self-center">
                              ${participant.Certificate === null ? '' : `<img class="btn-icon" href="course.html?id=${participant.id}" id="btn-view-${participant.id}" src="assets/icons/certificate-dev-96.png" alt="Ver curso" width="35" height="35" title="Ver" style="margin: 4px" onclick="(() => {window.location.href = 'certificate.html?code=${participant.Certificate.validate_code}'})()">`}
                              <img class="btn-icon" id="btn-edit-${participant.id}" src="assets/icons/edit-104.png" alt="Editar" width="35" height="35" title="Editar" style="margin: 4px" onclick="editGrade(${participant.id}, '${token}')">
                              <img class="btn-icon" id="btn-delete-${participant.id}" src="assets/icons/trash-96.png" alt="Deletar" width="35" height="35" title="Deletar" style="margin: 4px" >
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

}

window.onload = async function() {
    await renderCourse()
};