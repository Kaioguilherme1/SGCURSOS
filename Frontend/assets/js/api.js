
// endereco da api
const API_URL = 'localhost'; // process.env.API_URL
const API_PORT = 3000; // process.env.API_PORT

function isValid(value) {
    return value != null && value !== '';
}
class user{
    constructor(){
        this.id = '';
        this.token = '';
        this.accountType = '';
        this.username = '';
    }

    /**
     * Registra um novo usuário.
     * @param {string} name - O nome do usuário.
     * @param {string} number - O número do usuário.
     * @param {string} email - O email do usuário.
     * @param {string} username - O nome de usuário.
     * @param {string} password - A senha do usuário.
     * @param {string} profile - O perfil do usuário.
     * @param {string} image_path - O caminho da imagem do usuário.
     * @returns {Promise} - Uma Promise que resolve com o resultado do registro.
     */
    async register(name, number, email, username, password, profile, image_path){


      const data = {
        name,
        number,
        email,
        username,
        password,
        profile,
        image_path
      };

      if (!isValid(data)) {
        return "Preencha todos os campos!"
      }

      fetch(`http://${API_URL}:${API_PORT}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        return responseData
      })
      .catch((error) => {
        console.error('Error:', error);
        return error
      });
    }

    /**
     * Realiza o login do usuário.
     * @param {string} username - O nome de usuário.
     * @param {string} password - A senha do usuário.
     * @returns {Promise} - Uma Promise que resolve com o resultado do login.
     */
    async login(username, password){
        if (!isValid(username) || !isValid(password)) {
        return "Preencha todos os campos!"
        }else{
          const data = {username, password};

          // Enviar os dados para o backend
          try{
              fetch(`http://${API_URL}:${API_PORT}/users/login`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data),
               }).then(response => response.json())
                  .then(responseData => {
                      console.log(responseData);
                      return responseData.login()
                  })
        }catch(error){
              console.error('Error:', error);
              return error
          }
        }
    }
}

class Course {
  constructor() {
    this.id = '';
    this.token = '';
    this.username = '';
    this.accountType = '';
  }
  /**
  * Obtém os cursos com base nos parâmetros fornecidos.
  * @param {boolean} all - Define se todos os cursos devem ser retornados.
  * @param {string|null} id - O ID do curso a ser buscado.
  * @param {string|null} name - O nome do curso a ser buscado.
  * @param {string} tags - As tags relacionadas ao curso a ser buscado.
  * @param {string} category - Define se a categoria do curso deve ser considerada na busca.
  * @param {boolean} participants - Define se os participantes devem ser considerados na busca.
  * @returns {Promise} - Uma promessa que resolve com os dados dos cursos retornados.
  */
  async get(all = true, id = null, name = null, tags = [], category = false, participants = false) {
    let requestGET = {};

    if (all && id == null && name == null && tags.length === 0) {
      requestGET = { url: `http://${API_URL}:${API_PORT}/courses/get`, method: 'POST' , body: {all: true} };
    } else if (!participants) {
      requestGET = { url: `http://${API_URL}:${API_PORT}/courses/get`, method: 'POST', body: { id, name, tags, category, participants } };
    } else if (this.token !== '' && participants) {
      requestGET = { url: `http://${API_URL}:${API_PORT}/courses/get`, method: 'POST', body: { token: this.token, id, name, tags, category, participants } };
    }
    return fetch(requestGET.url, {headers: {'Content-Type': 'application/json'} ,
                                      method: requestGET.method,
                                      body: JSON.stringify(requestGET.body) })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        return responseData;
      })
      .catch(error => {
        console.error('Erro:', error);
        throw error;
      });
  }
}
