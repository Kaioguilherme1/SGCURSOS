// Arquivo: login.js

function isValid(value) {
    return value != null && value !== '';
}

document.getElementById('btn-login').addEventListener('click', login);

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

function login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username, password);
    if (!isValid(username) || !isValid(password)) {
    alert('Preencha todos os campos!');
    }else{
      const data = {username, password};

      // Enviar os dados para o backend
      try{
          fetch('http://localhost:3000/users/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
           }).then(response => response.json())
              .then(responseData => {
                  console.log(responseData);
                    if(responseData.error){
                        alert(responseData.login.message);
                        return
                    }
                    const token = responseData.login.token;
                    const {username, name, email, profile, image_path } = responseData.login.user;

                    // Armazenar os valores no localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', token);
                    localStorage.setItem('name', name);
                    localStorage.setItem('username', username);
                    localStorage.setItem('email', email);
                    localStorage.setItem('profile', profile);
                    localStorage.setItem('image_path', image_path);
                    window.location.href = 'index.html';
              })

    }catch(error){
          console.error('Error:', error);
      }
    }
}
