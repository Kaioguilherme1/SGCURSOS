// script.js

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

const name = document.getElementById('name').value;
const number = document.getElementById('number').value;
const email = document.getElementById('email').value;
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
const profile = "aluno"
const image_path = "path";

console.log(image_path);

async function register() {
  user = new user();
  let responseData = await user.register(name, number, email, username, password, profile, image_path);

  if (typeof responseData === 'string') {
    alert(responseData);
  } else if (responseData.error === 'true') {
    alert(responseData.message);
  } else {
    alert(responseData.message);
    window.location.href = 'login.html';
  }
}