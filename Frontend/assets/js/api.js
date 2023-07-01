
// endereco da api
const APT_PROTOCOL = 'http'; // process.env.APT_PROTOCOL
const API_URL = 'localhost'; // process.env.API_URL
const API_PORT = 3000; // process.env.API_PORT

function isValid(value) {
    return value != null && value !== '';
}
class user{
    constructor(id, token, username, accountType){
        this.id = id;
        this.token = token;
        this.accountType = username;
        this.username = accountType;
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

      return await fetch(`${APT_PROTOCOL}://${API_URL}:${API_PORT}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(responseData => {
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
              return await fetch(`${APT_PROTOCOL}://${API_URL}:${API_PORT}/users/login`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data),
               }).then(response => response.json())
                  .then(responseData => {
                    return responseData;
                  })
        }catch(error){
              console.error('Error:', error);
              return error
          }
        }
    }

    async get(id){
        try{
            return await fetch(`${APT_PROTOCOL}://${API_URL}:${API_PORT}/users/${id}`, {
                method: 'GET',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json'
                },
             }).then(response => response.json())
                .then(responseData => {
                    return responseData.response;
                })
      }catch(error){
            console.error('Error:', error);
            return error
        }
    }

    async createRegister(course_id){
        const data = {
            user_id: this.id,
            course_id: course_id
        }
        try{
            return await fetch(`${APT_PROTOCOL}://${API_URL}:${API_PORT}/register/create`, {
                method: 'POST',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
             }).then(response => response.json())
                .then(responseData => {
                    return responseData;
                })
        } catch (error) {
            console.error('Error:', error);
            return error
        }
    }
    async getRegister (registerId){
        const data = {
                            "id": registerId,
                            "course": null,
                            "user": null,
                            "certificate": true,
                            "all": true
                          };

        try{
             return  await fetch(`${APT_PROTOCOL}://${API_URL}:${API_PORT}/register/get`, {
                method: 'POST',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
             }).then(response => response.json())
                .then(responseData => {
                    return responseData;
                })
        } catch (error) {
            console.error('Error:', error);
            return error
        }
    }

    async editRegister(id, data){
        try{
            return await fetch(`${APT_PROTOCOL}://${API_URL}:${API_PORT}/register/${id}`, {
                method: 'PUT',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
             }).then(response => response.json())
                .then(responseData => {
                    return responseData;
                })
        } catch (error) {
            console.error('Error:', error);
            return error
        }
    }

}

class Course {
  constructor(id, token, username, accountType) {
    this.id = id;
    this.token = token;
    this.username = username;
    this.accountType = accountType;
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
      requestGET = { url: `${APT_PROTOCOL}://${API_URL}:${API_PORT}/courses/get`, method: 'POST' , body: {all: true} };
    } else if (!participants) {
      requestGET = { url: `${APT_PROTOCOL}://${API_URL}:${API_PORT}/courses/get`, method: 'POST', body: { id, name, tags, category, participants } };
    } else if (this.token !== '' && participants) {
      requestGET = { url: `${APT_PROTOCOL}://${API_URL}:${API_PORT}/courses/get`, method: 'POST', body: { token: this.token, id, name, tags, category, participants } };
    }
    return fetch(requestGET.url, {
        headers: {
            'authorization': this.token,
            'Content-Type': 'application/json'
        } ,
        method: requestGET.method,
        body: JSON.stringify(requestGET.body) })

      .then(response => response.json())
      .then(responseData => {
        return responseData;
      })
      .catch(error => {
        console.error('Erro:', error);
        throw error;
      });
  }

  async endCourse() {
      const courses = await this.get(false, this.id, null, [], false, true);
      const course = courses.courses[0];
      const participants = course.participants;

      // gerando os certificados
      for (const participant of participants) {
          await fetch(`${APT_PROTOCOL}://${API_URL}:${API_PORT}/register/certificate`, {
              method: 'POST',
              headers: {
                  'authorization': this.token,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                   "registrationId": participant.id,
              }),
          }).then(response => response.json())
              .then(responseData => {
                  if (responseData.error === true) {
                     if (responseData.message !== 'Usuário não possui nota suficiente para gerar certificado' || responseData.message !== 'Usuário não possui progresso suficiente para gerar certificado') {
                         alert(responseData.message)
                     }
                  }
              })
              .catch(error => {
                  console.error('Erro:', error);
                  throw error;
              });
      }

      return courses.courses[0];
  }

  async delete(id) {
    return fetch(`${APT_PROTOCOL}://${API_URL}:${API_PORT}/courses/${id}`, {
      method: 'DELETE',
      headers: {
          'authorization': this.token,
          'Content-Type': 'application/json'
      },

    })
    .then(response => response.json())
    .then(responseData => {
      return responseData;
    })
    .catch(error => {
      console.error('Erro:', error);
      throw error;
    });
  }
}

async function validate(code) {
  const data = {"validate_code": code };
    try {
        return await fetch(`${APT_PROTOCOL}://${API_URL}:${API_PORT}/register/certificate/validate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        }).then(response => response.json())
        .then(responseData => {
            return responseData;
        })
    } catch (error) {
        console.error('Error:', error);
        return error
    }

}