// Função para verificar se o nome está preenchido corretamente
const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');

const nameError = document.getElementById('name-error');
const numberError = document.getElementById('number-error');
const emailError = document.getElementById('email-error');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const passwordConfirmError = document.getElementById('password-confirm-error');

function isValid() {
  return (
    nameError.textContent === '' &&
    numberError.textContent === '' &&
    emailError.textContent === '' &&
    usernameError.textContent === '' &&
    passwordError.textContent === '' &&
    passwordConfirmError.textContent === ''
  );
}

function validateName() {
  const name = nameInput.value;
  if (name.length < 8) {
    nameError.textContent = 'Nome: (mínimo 8 caracteres)';
    nameError.style.color = 'red';
  } else {
    nameError.textContent = '';
  }
}

function validateNumber() {
  let number = numberInput.value;
  number = number.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (number.length < 10) {
    numberError.textContent = 'Número: (mínimo 10 dígitos)';
    numberError.style.color = 'red';
  } else if (number.length > 10) {
    numberError.textContent = 'Número: (máximo 11 dígitos)';
    numberError.style.color = 'red';
  }else {
    numberError.textContent = '';
  }

  // Formata o número adicionando parênteses e hífen
  let formattedNumber = '(' + number.substring(0, 2) + ') ';
  formattedNumber += number.substring(2, 6) + '-' + number.substring(6);
  numberInput.value = formattedNumber;
}

function validateEmail() {
  const email = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = 'E-mail inválido';
    emailError.style.color = 'red';
  } else {
    emailError.textContent = '';
  }
}

function validateUsername() {
  const username = usernameInput.value;
  if (username.length < 6) {
    usernameError.textContent = 'Usuário: (mínimo 6 caracteres)';
    usernameError.style.color = 'red';
  } else {
    usernameError.textContent = '';
  }
}

function validatePassword() {
  const password = passwordInput.value;
  if (password.length < 8) {
    passwordError.textContent = 'Senha: (mínimo 8 caracteres)';
    passwordError.style.color = 'red';
  } else {
    passwordError.textContent = '';
  }
}

function validatePasswordConfirm() {
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  if (password !== passwordConfirm) {
    passwordConfirmError.textContent = 'As senhas não coincidem';
    passwordConfirmError.style.color = 'red';
  } else {
    passwordConfirmError.textContent = '';
  }
}

nameInput.addEventListener('input', validateName);
numberInput.addEventListener('input', validateNumber);
emailInput.addEventListener('input', validateEmail);
usernameInput.addEventListener('input', validateUsername);
passwordInput.addEventListener('input', validatePassword);
passwordConfirmInput.addEventListener('input', validatePasswordConfirm);
