
async function renderCourse() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = [urlParams.get('id')];
    const course = new Course()
    const courseJson = await course.get(false, id, null, [], null, false)

    console.log(courseJson)
    // Extrai os dados do JSON do curso
    let {name, description, duration_hours, Category, tags, lessons} = courseJson.courses[0].course
    let enrolled_count = courseJson.courses[0].participants.length

    // Insere o conteúdo renderizado no container
    let courseTitle = document.getElementById('course-title')
    let courseDescription = document.getElementById('course-description')
    let courseCh = document.getElementById('course-ch')
    let courseEnrolled_count = document.getElementById('course-enrolled_count')
    let courseCategory = document.getElementById('course-category')
    let courseTags = document.getElementById('course-tags')
    let courseLessons = document.getElementById('course-lessons')

    courseTitle.innerHTML = name
    courseDescription.innerHTML = description
    courseCh.innerHTML = `Carga Horária: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${duration_hours} horas</span>`
    courseEnrolled_count.innerHTML = `Matriculados Atualmente: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${enrolled_count} alunos</span>`
    courseCategory.innerHTML = `<a type="button" class="btn btn-dark" href="courses.html?category=${Category.name}"> ${Category.name}</a>`
    courseTags.innerHTML = tags.map(tag => `<a href="courses.html?tags=${tag}" type="button" class="btn btn-outline-primary btn-sm" style="margin: 4px">${tag}</a>`).join('')
    courseLessons.innerHTML = lessons.map(lesson => `<li class="list-group-item">${lesson}</li>`).join('')
}

window.onload =async function() {
    await renderCourse()
};