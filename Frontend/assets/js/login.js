// Arquivo: login.js
const user = new user();

document.getElementById('btn-login').addEventListener('click', login);

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

responseData = await user.login(username, password);

if (typeof responseData === 'string') {
  console.log(responseData);
  alert(responseData);
} else if (responseData.error === 'true') {
  console.log(responseData.message);
  alert(responseData.message);
} else {

const token = responseData.token;
const {name, email, profile, image_path } = responseData.user;

// Armazenar os valores no localStorage
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('token', token);
localStorage.setItem('name', name);
localStorage.setItem('username', username);
localStorage.setItem('email', email);
localStorage.setItem('profile', profile);
localStorage.setItem('image_path', image_path);
window.location.href = 'index.html';

}
