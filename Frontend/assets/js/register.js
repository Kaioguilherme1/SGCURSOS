// script.js
let User = new user();

document.getElementById('image-upload').addEventListener('change', function() {
  let file = this.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('profile-image').src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById('profile-image').src = '../assets/img/blank-profile.png';
  }
});

const btnRegister = document.getElementById('btn-register');
btnRegister.addEventListener('click', register);


async function register() {
  const name = document.getElementById('name').value;
  const number = document.getElementById('number').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const profile = "aluno"
  const image_path = "path";

  const responseData = await User.register(name, number, email, username, password, profile, image_path);
  console.log(responseData);
  if (typeof responseData === 'string') {
    alert(responseData);
  } else if (responseData.error === 'true') {
    alert(responseData.message);
  } else {
    alert(responseData.message);
    // window.location.href = 'login.html';
  }
}