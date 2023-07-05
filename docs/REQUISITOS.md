
# Requisitos Da SGCURSOS

---

## Autenticação/autorização com Login e Cadastro de Usuários
- [x]  Implementar sistema de autenticação com login
- [x]  Criar funcionalidade de cadastro de novos usuários
## 2. Usuário root
- [x]  Criar usuário root durante a criação das tabelas do sistema
- [x]  Permitir que o usuário root conceda permissões a novos usuários (por exemplo, perfil admin)
## 3. Funcionalidades do usuário admin
    
### Backend
    
 1. Funcionalidades do usuário admin
    - [x]  Cadastrar novas categorias de curso
        - [x]  Endpoint para cadastrar uma nova categoria de curso
        - [x]  Lógica para validar e salvar a nova categoria no banco de dados
    - [x]  Alterar categorias de curso existentes
        - [x]  Endpoint para alterar uma categoria de curso existente
        - [x]  Lógica para validar e atualizar a categoria no banco de dados
    - [x]  Deletar categorias de curso existentes
        - [x]  Endpoint para deletar uma categoria de curso existente
        - [x]  Lógica para remover a categoria do banco de dados
    - [x]  Cadastrar novos cursos
        - [x]  Endpoint para cadastrar um novo curso
        - [x]  Lógica para validar e salvar o novo curso no banco de dados
    - [x]  Alterar cursos existentes
        - [x]  Endpoint para alterar um curso existente
        - [x]  Lógica para validar e atualizar o curso no banco de dados
    - [x]  Deletar cursos existentes
        - [x]  Endpoint para deletar um curso existente
        - [x]  Lógica para remover o curso do banco de dados
    - [x]  Suspender conta de usuário aluno
        - [x]  Endpoint para suspender a conta de um usuário aluno
        - [x]  Lógica para atualizar o status da conta do aluno no banco de dados

    ### Frontend
    
1. Funcionalidades do usuário admin
    - [x]  Listagem das categorias de curso
        - [x]  Página para exibir a lista de categorias de curso
        - [x]  Requisição ao backend para obter a lista de categorias
    - [x]  Formulário para cadastrar uma nova categoria de curso
        - [x]  Página com um formulário para inserir os dados da nova categoria
        - [x]  Requisição ao backend para cadastrar a nova categoria
    - [ ]  Formulário para alterar uma categoria de curso existente
        - [ ]  Página com um formulário preenchido com os dados da categoria a ser alterada
        - [ ]  Requisição ao backend para atualizar a categoria
    - [ ]  Formulário para deletar uma categoria de curso existente
        - [ ]  Página com informações da categoria a ser deletada e um botão de confirmação
        - [ ]  Requisição ao backend para deletar a categoria
    - [x]  Listagem dos cursos
        - [x]  Página para exibir a lista de cursos
        - [x]  Requisição ao backend para obter a lista de cursos
    - [x]  Formulário para cadastrar um novo curso
        - [x]  Página com um formulário para inserir os dados do novo curso
        - [x]  Requisição ao backend para cadastrar o novo curso
    - [x]  Formulário para alterar um curso existente
        - [x]  Página com um formulário preenchido com os dados do curso a ser alterado
        - [x]  Requisição ao backend para atualizar o curso
    - [x]  Formulário para deletar um curso existente
        - [x]  Página com informações do curso a ser deletado e um botão de confirmação
        - [x]  Requisição ao backend para deletar o curso
    - [x]  Listagem dos alunos
        - [x]  Página para exibir a lista de alunos
        - [x]  Requisição ao backend para obter a lista de alunos
    - [x]  Rotina para "fechar" um curso e emitir certificados
        - [x]  Verificação da carga horária dos alunos que concluíram o curso
        - [x]  Emissão de certificados para os alunos com mais de 90% de carga horária concluída
## 4. Funcionalidades do usuário aluno
- [x]  Cadastro no sistema
- [x]  Atualização do perfil (endereço, celular, foto do perfil)
- [x]  Inscrição nos cursos disponíveis
## 5. Vinculação de cursos e categorias
- [x]  Vincular cursos a apenas uma categoria de cursos
- [x]  Permitir que uma categoria de cursos contenha vários cursos
##  6. Emissão de certificados
- [x]  Estabelecer critérios de validação para emissão de certificados
- [x]  Critério 1: Aluno respondeu um questionário e acertou mais de 70%
- [x]  Critério 2: Aluno completou mais de 90% da carga horária do curso
- [x]  Lançamento da carga horária pelo perfil admin
## 7. Sistema de emissão e controle dos certificados utilizando Blockchain
- [ ]  Implementar sistema de emissão e controle de certificados utilizando Blockchain (desafio!) (No caso foi usando um sistema de hash com 16 bits)
## 8. Deploy do sistema na AWS
- [x]  Realizar deploy da aplicação em uma instância EC2 da AWS
- [ ]  Seguir os passos vistos em aula  [x] (Realização ultilizando micros serviços em docker com arquitetura Rest Full)
- [x]  Usuário de acesso padrão: root
- [x]  Senha padrão: 1234