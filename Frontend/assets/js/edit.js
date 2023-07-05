
let token = localStorage.getItem("token");
let userId = localStorage.getItem("id");
let userName = localStorage.getItem("name");
let userProfile = localStorage.getItem("profile");

let urlParams = new URLSearchParams(window.location.search);
let courseId = urlParams.get('course');
let create = urlParams.get('create');

let headerEdit = document.getElementById('header-edit');
let containerEdit = document.getElementById('edit-container');

let courseApi = new Course(courseId, token, userName, userProfile);
let userApi = new user(userId, token, userName, userProfile);
//--------------------------------------- funções de formulario ---------------------------------------

let tagsArray = []; // Array para armazenar as tags
let topicArray = []; // Array para armazenar os topicos
let categoryList = []; // Array para armazenar as categorias


//--------------------------------------- funções das tags ---------------------------------------
function addTag() {
  const tagsInput = document.getElementById('tags-input');
  const tagValue = tagsInput.value.trim();

  if (tagValue !== '') {
    tagsArray.push(tagValue);
    tagsInput.value = ''; // Limpa o campo de input

    renderTags(); // Renderiza as tags atualizadas
  }
}

function removeTag(tagIndex) {
  if (tagIndex !== -1) {
    tagsArray.splice(tagIndex, 1); // Remove a tag do array
    renderTags(); // Renderiza as tags atualizadas
  }
}

function renderTags() {
  const tagsContainer = document.getElementById('tags-container');
  tagsContainer.innerHTML = ''; // Limpa o container de tags
  tagsContainer.innerHTML = `${tagsArray.map((tag, index) => `<a type="button" class="btn btn-outline-primary btn-sm" style="margin: 2px">${tag} 
    <button type="button" class="btn btn-sm btn-outline-danger" style="border: none;" onclick="removeTag(${index})">x</button></a>`).join('')}`;
}
//--------------------------------------- funções dos topicos ---------------------------------------

function addTopic() {
    const topicInput = document.getElementById('topic-input');
    const topicValue = topicInput.value.trim();

    if (topicValue !== '') {
      topicArray.push(topicValue);
      topicInput.value = ''; // Limpa o campo de input

      renderTopic(); // Renderiza os tópicos atualizados
    }
  }

  function removeTopic(index) {
    if (index !== -1) {
      topicArray.splice(index, 1); // Remove o tópico do array
      renderTopic(); // Renderiza os tópicos atualizados
    }
  }

function renderTopic() {
  const topicContainer = document.getElementById('lessons-list');
  topicContainer.innerHTML = ''; // Limpa o container
  topicContainer.innerHTML = `${topicArray.map((topic, index) => `<li  class="list-group-item " style="margin: 2px">${topic} 
    <button type="button" class="btn btn-sm btn-outline-danger" style="border: none;" onclick="removeTopic(${index})">x</button></li>`).join('')}`;
}

//--------------------------------------- funções do modal ---------------------------------------
async function createCategory() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  document.getElementById('create-category-form').addEventListener('submit', async function (event) {
      event.preventDefault();
      const categoryName = document.getElementById('category-name').value;
      const categoryDescription = document.getElementById('category-description').value;
      // Aqui você pode executar a lógica para criar a categoria com o nome e descrição informados
      console.log('Nome:', categoryName);
      console.log('Descrição:', categoryDescription);
      const response = await createCategoryApi(token,{ "name": categoryName, "description": categoryDescription });
      alert(response.category.message);
      closeCreateCategoryModal();
  });
}

function closeCreateCategoryModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}


//--------------------------------------- funções de requisição ---------------------------------------

async function saveForm() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const userData = {};
  const forms = document.querySelectorAll('.needs-validation');
  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  if (create === 'true' && (userProfile === 'admin' || userProfile === 'root')) {

    if (tagsArray.length === 0) {
      alert('É necessário adicionar pelo menos uma tag');
      return;
    }

    if (confirm('Deseja criar o curso?')) {
      const banner = document.getElementById('input-banner').files[0];
      const name = document.getElementById('input-name').value;
      const description = document.getElementById('input-description').value;
      const duration_hours = document.getElementById('input-duration_hours').value;
      const category = parseInt(document.getElementById('input-category').value);

      const response = await courseApi.create(name, description, tagsArray, category, banner, duration_hours, topicArray)
      alert(response.course.message)
    }
  } else if (create !== 'true' && courseId !== null && (userProfile === 'admin' || userProfile === 'root')) {

    if (confirm('Deseja atualizar o curso?')) {
        //Armazene os valores iniciais aqui
        const bannerInput = document.getElementById('input-banner');
        const nameInput = document.getElementById('input-name');
        const descriptionInput = document.getElementById('input-description');
        const durationInput = document.getElementById('input-duration_hours');
        const categoryInput = document.getElementById('input-category');

        const data = {
            banner: bannerInput.files[0],
            name: nameInput.value,
            description: descriptionInput.value,
            duration_hours: durationInput.value,
            category: parseInt(categoryInput.value),
        };

        // Verifica se o valor do input foi alterado
        if (data.banner !== '') {
            delete data.banner;
        }
        if (data.name === '') {
            delete data.name;
        }
        if (data.description === '') {
            delete data.description;
        }
        if (data.duration_hours === '') {
            delete data.duration_hours;
        }
        if (data.category === 'selecione') {
            delete data.category;
        }


        // Adicione as propriedades tags e topics ao objeto data
        data.tags = tagsArray;
        data.topics = topicArray;
        console.log(data)
        const response = await courseApi.edit(data)
        console.log(response)
        alert(response.message)

    }
  } else if (userProfile === 'admin' || userProfile === 'root') {
    // Atualiza o perfil do usuário admin
    userData.name = document.getElementById('input-name').value || undefined;
    userData.username = document.getElementById('input-username').value || undefined;
    userData.email = document.getElementById('input-email').value || undefined;
    userData.number = document.getElementById('input-number').value || undefined;
    userData.password = document.getElementById('input-password').value || undefined;
    userData.confirmPassword = document.getElementById('input-password-confirm').value || undefined;
    userData.profile = document.getElementById('input-admin').checked ? 'admin' : undefined;

    if (confirm('Deseja atualizar o perfil?')) {
      await updateUser(userData);
    }
  } else if (userProfile === 'student') {
    userData.name = document.getElementById('input-name').value || undefined;
    userData.username = document.getElementById('input-username').value || undefined;
    userData.email = document.getElementById('input-email').value || undefined;
    userData.number = document.getElementById('input-number').value || undefined;
    userData.password = document.getElementById('input-password').value || undefined;
    userData.confirmPassword = document.getElementById('input-password-confirm').value || undefined;
    userData.profile = document.getElementById('input-admin').checked ? 'admin' : undefined;

    if (confirm('Deseja atualizar o perfil?')) {
      console.log(userData);
    }
  } else {
    window.location.href = 'index.html';
  }
}

async function updateUser(data){
    const response = await userApi.edit(data);
    if (response.response) {
      alert('Perfil atualizado com sucesso!');
      window.location.href = 'index.html';
    } else {
      alert(response.error);
    }
}

//--------------------------------------- funções de rendenização ---------------------------------------
async function renderCreateCourse() {
    const response = await getCategory({"all": true, "id": null, "name": null});
    categoryList = response.categories.map(category => category);
    const headerContent = `
        <div class="row align-items-start" style="max-width: 60%">
          <h1>Criar Curso</h1>
          <div class="col">
            <p>Carga Horária: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">0 horas</span></p>
          </div>
          <div class="col">
            <p>Matriculados Atualmente: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">0 alunos</span></p>
          </div>
        </div>
    `;
    const containerContent = `
        <div class="container" style="max-width: 60%">
          <form class="row g-3 needs-validation" novalidate>
            <fieldset>
              <legend>Criar Curso</legend>
              <div class="mb-3">
                <label for="banner" class="form-label">Banner:</label>
                <input type="file" class="form-control" id="input-banner" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="input-name" placeholder="Nome do curso" required>
                <div class="valid-feedback">
                  Parece bom!
                </div>
                <div class="invalid-feedback">
                  Por favor, insira um nome válido.
                </div>
              </div>
        
              <div class="mb-3">
                <label for="description" class="form-label">Descrição:</label>
                <textarea class="form-control" id="input-description" rows="3" placeholder="Descreva o curso" required></textarea>
                <div class="valid-feedback">
                  Parece bom!
                </div>
                <div class="invalid-feedback">
                  Por favor, insira uma descrição válida.
                </div>
              </div>
              <div class="mb-3">
                <label for="lessons" class="form-label">Tópicos Abordados:</label>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Tópicos" id="topic-input" aria-label="Tópicos" aria-describedby="add-topico" required>
                  <button class="btn btn-primary" type="button" id="add-topico" onclick="addTopic()">Adicionar</button>
                </div>
                <ul id="lessons-list" class="list-group list-group-flush list-group-numbered"></ul>
                <div class="valid-feedback">
                  Parece bom!
                </div>
                <div class="invalid-feedback">
                  Por favor, insira pelo menos um tópico.
                </div>
              </div>
        
              <div class="mb-3">
                <label class="form-label">Tags:</label>
                <div class="d-flex flex-wrap justify-content-start" id="tags-container" style="margin-bottom: 5px"></div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control was-validated" placeholder="Tags" id="tags-input" aria-label="Tags" aria-describedby="add-tag-button" required>
                  <button class="btn btn-primary" type="button" id="add-tag-button" onclick="addTag()">Adicionar</button>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="duration_hours" class="form-label">Duração em horas:</label>
                  <input type="number" class="form-control" id="input-duration_hours" placeholder="Carga horária" required>
                  <div class="valid-feedback">
                    Parece bom!
                  </div>
                  <div class="invalid-feedback">
                    Por favor, insira uma carga horária válida.
                  </div>
                </div>
                <div class="col">
                  <label for="duration_hours" class="form-label">Categoria Do Curso</label>
                  <select class="form-select" id="input-category" aria-label="Default select example" required>
                      <option selected disabled value="">Selecione...</option>
                      ${categoryList.map((option) => `<option value="${option.id}">${option.name}</option>`).join('')}
                  </select>
                    
                  <button type="button" class="btn btn-primary" onclick="createCategory()" style="margin: 2px">Criar Categoria</button>
                    
                  <div class="valid-feedback">
                    Parece bom!
                  </div>
                  <div class="invalid-feedback">
                    Por favor, selecione uma categoria válida.
                  </div>
                </div>
              </div>
              <div class="row justify-content-end" style="padding: 30px">
                <button type="submit" class="btn btn-primary" style="max-width: 100px; " onclick="event.preventDefault(); (async () => { await saveForm(); })()">Salvar</button>
              </div>
            </fieldset>
          </form>
        </div>
        
        <div id="modal" class="modal">
          <div class="container" style="max-width: 40%">
            <h2 class="mb-4">Criar Categoria</h2>
            <form id="create-category-form">
              <div class="mb-3">
                <label for="category-name" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="category-name" placeholder="Digite o nome da categoria" required>
              </div>
              <div class="mb-3">
                <label for="category-description" class="form-label">Descrição:</label>
                <textarea class="form-control" id="category-description" rows="3" placeholder="Digite a descrição da categoria" required></textarea>
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Criar</button>
                <button type="button" class="btn btn-secondary" onclick="closeCreateCategoryModal()">Cancelar</button>
              </div>
            </form>
          </div>
        </div>

    `;

    const tagsContainer = document.getElementById('tags-container');
    const addTagButton = document.getElementById('add-tag-button');

    headerEdit.insertAdjacentHTML('afterbegin', headerContent);
    containerEdit.insertAdjacentHTML('beforeend', containerContent);
    document.title = "Criar Curso"
    renderTopic();
    renderTags();

}

async function renderEditCourse() {
    const response = await getCategory({"all": true, "id": null, "name": null});
    categoryList = response.categories.map(category => category);
    const data = await courseApi.get(false, courseId);
    const {name, tags, duration_hours, description, category_id, lessons} = data.courses[0].course;
    const enrolled_count = data.courses[0].participants.length;
    const selectedID = category_id
    tagsArray = tags;
    topicArray = lessons;
    const headerContent = `
        <div class="row align-items-start" style="max-width: 60%">
            <h1>${name}</h1>
            <div class="col">
              <p>Carga Horária: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${duration_hours} horas</span></p>
            </div>
            <div class="col">
              <p>Matriculados Atualmente: <span style="font-weight: bold; background-color: rgba(255, 255, 255, 0.3); padding: 2px 6px; border-radius: 4px;">${enrolled_count} alunos</span></p>
            </div>
        </div>
    `;
    const containerContent = `
        <div class="container" style="max-width: 60%"> 
            <form class="row g-3" >
              <fieldset>
                <legend>Editar Curso</legend>
                <div class="mb-3">
                  <label for="banner" class="form-label">Banner:</label>
                   <input type="file" class="form-control" id="input-banner" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                </div>
                <div class="mb-3">
                  <label for="name" class="form-label">Nome:</label>
                  <input type="text" class="form-control" id="input-name" placeholder="${name}">
                </div>
        
                <div class="mb-3">
                  <label for="description" class="form-label">Descrição:</label>
                  <textarea class="form-control" id="input-description" rows="3" placeholder="${description}"></textarea>
                </div>
                <div class="mb-3">
                  <label for="lessons" class="form-label">Topicos Abordados:</label>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Topicos" id="topic-input" aria-label="Topicos" aria-describedby="add-topico">
                    <button class="btn btn-primary" type="button" id="add-topico" onclick="addTopic()">add</button>
                  </div>  
                  <ul id="lessons-list" class="list-group list-group-flush list-group-numbered"></ul>
                </div>

                <div class="mb-3">
                  <label class="form-label">Tags:</label>
                  <div class="d-flex flex-wrap justify-content-start" id="tags-container" style="margin-bottom: 5px"></div>
                  <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Tags" id="tags-input" aria-label="Tags" aria-describedby="add-tag-button">
                      <button class="btn btn-primary" type="button" id="add-tag-button" onclick="addTag()">add</button>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="duration_hours" class="form-label">Duração em horas:</label>
                    <input type="number" class="form-control" id="input-duration_hours" placeholder="${duration_hours}">
                  </div>
                  <div class="col">
                    <label for="duration_hours" class="form-label">Categoria Do Curso</label>
                    <select class="form-select" id="input-category" aria-label="Default select example" required>
                      <option selected disabled value="">Selecione...</option>
                      ${categoryList.map((option) => `<option value="${option.id}">${option.name}</option>`).join('')}
                    </select>
                    
                    <button type="button" class="btn btn-primary" onclick="createCategory()" style="margin: 2px">Criar Categoria</button>

                  </div>
                </div>
                <div class="row justify-content-end" style="padding: 30px">
                    <button type="submit" class="btn btn-primary" style="max-width: 100px;" onclick="event.preventDefault(); (async () => { await saveForm(); })()">Salvar</button>
                </div>
              </fieldset>
            </form>
        </div>
        
        <div id="modal" class="modal">
          <div class="container" style="max-width: 40%">
            <h2 class="mb-4">Criar Categoria</h2>
            <form id="create-category-form">
              <div class="mb-3">
                <label for="category-name" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="category-name" placeholder="Digite o nome da categoria" required>
              </div>
              <div class="mb-3">
                <label for="category-description" class="form-label">Descrição:</label>
                <textarea class="form-control" id="category-description" rows="3" placeholder="Digite a descrição da categoria" required></textarea>
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Criar</button>
                <button type="button" class="btn btn-secondary" onclick="closeCreateCategoryModal()">Cancelar</button>
              </div>
            </form>
          </div>
        </div>

    `;

    // const tagsContainer = document.getElementById('tags-container');
    // const addTagButton = document.getElementById('add-tag-button');
    headerEdit.insertAdjacentHTML('afterbegin', headerContent);
    containerEdit.insertAdjacentHTML('beforeend', containerContent);
    document.title = name;
    renderTopic();
    renderTags();

    const selectElement = document.getElementById('input-category');
    // Itera sobre as opções do select
    for (let i = 0; i < selectElement.options.length; i++) {
      const option = selectElement.options[i];

      // Verifica se o valor da opção é igual ao ID selecionado
      if (option.value === selectedID.toString()) {
        // Define a opção como selecionada
        option.selected = true;
        break; // Interrompe o loop após encontrar a opção correta
      }
    }
}

async function renderEditProfileAdmin() {
    const data = await userApi.get(userId);
    const {name, username, email, number, image_path, profile, id} = data.user;

    const headerContent = `
      <div class="row align-items-start" style="max-width: 60%">
            <h1>Editar Perfil</h1>
            <p>Atualize suas informações pessoais</p>
            <h3><span class="badge text-bg-warning">Admin Mode</span></h3>
      </div>
    `;
    const containerContent = `
        <div class="container" style="max-width: 60%"> 
            <form class="row g-3 needs-validation" novalidate method="POST" enctype="multipart/form-data">
              <fieldset>
                <legend>Editar Admin</legend>
                <div class="mb-3">
                    <div class="profile-icon" style="margin: 5px">
                        <label for="image-upload" id="image-label">
                          <img id="profile-image" src="./assets/img/blank-profile.png" alt="Perfil">
                        </label>
                        <input type="file" id="image-upload" name="image" accept="image/*" style="display: none">
                        <label for="image-upload" id="select-image-text">Escolher Imagem</label>
                    </div>
                </div>      
                <div class="mb-3">
                    <label for="name" class="form-label">Nome Completo:</label>
                    <input type="text" class="form-control" id="input-name" placeholder="${name}">
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Username:</label>
                    <input type="text" class="form-control" id="input-username" placeholder="${username}">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail:</label>
                    <input type="email" class="form-control" id="input-email" placeholder="${email}">
                </div>
                <div class="mb-3">
                    <label for="number" class="form-label">Número:</label>
                    <input type="number" class="form-control" id="input-number" placeholder="${number}">
                </div>              
                <div class="mb-3">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="input-student">
                      <label class="form-check-label" for="flexRadioDefault1">
                        Aluno
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="input-admin" checked>
                      <label class="form-check-label" for="flexRadioDefault2">
                        Admnistrador
                      </label>
                    </div>
                </div>
                <div class="col-md">
                  <div class="row">
                    <div class="col">
                      <label for="password" class="form-label">Senha:</label>
                      <input type="password" class="form-control" id="input-password" placeholder="Digite a senha">
                    </div>
                    <div class="col">
                      <label for="password" class="form-label">Confirmar Senha:</label>
                      <input type="password" class="form-control" id="input-password-confirm" placeholder="Digite a senha novamente">
                    </div>
                    <div class="col">
                      <div class="row justify-content-end" style="padding: 30px">
                        <button type="submit" class="btn btn-primary" style="max-width: 100px;" onclick="event.preventDefault(); (async () => { await saveForm(); })()">Salvar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>    
        </div>
    `;



    headerEdit.insertAdjacentHTML('afterbegin', headerContent);
    containerEdit.insertAdjacentHTML('beforeend', containerContent);
    document.title = "Editar Admin";

}

async function renderEditProfile() {
    const data = await userApi.get(userId);
    if (data.error){
        alert(data.message)
        window.location.href = 'index.html';
    }
    const {name, username, email, number, image_path,} = data.user;

    const headerContent = `
      <div class="row align-items-start" style="max-width: 60%">
            <h1>Editar Perfil</h1>
            <p>Atualize suas informações pessoais</p>
      </div>
    `;
    const containerContent = `
        <div class="container" style="max-width: 60%"> 
            <form>
              <fieldset>
                <legend>Editar Usuario</legend>
                <div class="mb-3">
                    <div class="profile-icon" style="margin: 5px">
                        <label for="image-upload" id="image-label">
                          <img id="profile-image" src="./assets/img/blank-profile.png" alt="Perfil">
                        </label>
                        <input type="file" id="image-upload" name="image" accept="image/*" style="display: none">
                        <label for="image-upload" id="select-image-text">Escolher Imagem</label>
                    </div>
                </div>      
                <div class="mb-3">
                    <label for="name" class="form-label">Nome Completo:</label>
                    <input type="text" class="form-control" id="input-name" placeholder="${name}">
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Username:</label>
                    <input type="text" class="form-control" id="input-username" placeholder="${username}">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail:</label>
                    <input type="email" class="form-control" id="input-email" placeholder="${email}">
                </div>
                <div class="mb-3">
                    <label for="number" class="form-label">Número:</label>
                    <input type="number" class="form-control" id="input-number" placeholder="${number}">
                </div>              
                <div class="col-md">
                  <div class="row">
                    <div class="col">
                      <label for="password" class="form-label">Senha:</label>
                      <input type="password" class="form-control" id="input-password" placeholder="Digite a senha">
                    </div>
                    <div class="col">
                      <label for="password" class="form-label">Confirmar Senha:</label>
                      <input type="password" class="form-control" id="input-password-confirm" placeholder="Digite a senha novamente">
                    </div>
                    <div class="col">
                      <div class="row justify-content-end" style="padding: 30px">
                        <button type="submit" class="btn btn-primary" style="max-width: 100px;" onclick="event.preventDefault(); (async () => { await saveForm(); })()">Salvar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>    
        </div>
    `;



    headerEdit.insertAdjacentHTML('afterbegin', headerContent);
    containerEdit.insertAdjacentHTML('beforeend', containerContent);
    document.title = "Editar User";
}

async function edit(){
    if(create === 'true' && courseId === null && (userProfile === 'admin' || userProfile === 'root')){
        //criar curso
        await renderCreateCourse();
    }else if (create === null && courseId !== null && (userProfile === 'admin' || userProfile === 'root')){
        //editar curso
        await renderEditCourse();
    }else if (userProfile === 'admin' || userProfile === 'root'){
        //editar perfil admin
        await renderEditProfileAdmin();
    }else if (userProfile === 'student'){
        // editar perfil estudante
        await renderEditProfile()
    }else{
        window.location.href = 'index.html';
    }
}

window.onload = edit;