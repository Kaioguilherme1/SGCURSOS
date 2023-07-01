
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const certificateCourseName = document.getElementById('certificate-course-name')
const certificateText = document.getElementById('certificate-text')
const certificateGrade = document.getElementById('certificate-grade')
const certificateDate = document.getElementById('certificate-date')
const certificateCode = document.getElementById('certificate-code')

async function getCertificateData() {
    let certificateData = await validate(code)

    if (certificateData.error) {
        alert(certificateData.message)
        window.location.href = "validar.html"
    }
    const {name,registration_id, course_name, final_grade, course_duration, issued_at, validate_code} = certificateData.certificate
    const data = new Date(issued_at)
    const formattedDate = data.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

    certificateCourseName.innerHTML = course_name
    certificateText.innerHTML = `Este certificado é concedido a ${name} Destinatário pelo numero de matricula (${registration_id}) Pela conclusão do ${course_name} com carga horária de ${course_duration} horas.`
    certificateGrade.innerHTML = final_grade
    certificateDate.innerHTML = `Emitido Dia  <em>${formattedDate}</em>`
    certificateCode.innerHTML = `Código de Verificação <br> ${validate_code}`
}


window.onload = async function() {
  // Aqui você chama a função renderCourses e passa a lista de cursos
    await getCertificateData()
};