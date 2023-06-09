
const {Course, Category, User} = require('../models/index');
const {Op} = require("sequelize");
const TokenController = require("../middleware/AuthToken");
const {hasPermissionAdmin, hasPermissionUser} = require("../middleware/roles");
const {requestLogger} = require("../config/logger");

async function createCourse(token ,data) {
    if (hasPermissionAdmin(token)){
        try {
            let course = await Course.create(data);
            return {
                error: false,
                message: 'Curso criado com sucesso',
                course: course
            }
        }catch (error) {
            requestLogger.error('Erro ao criar curso: ' + error.message);
            return {
                error: true,
                message: 'Erro ao criar curso' + data.name,
                error_message: error.message,
            }
        }
    }else {
        requestLogger.error('tentaiva de criar curso sem permissão');
        return {
            error: true,
            message: 'Você não tem permissão para criar um curso',
        }
    }
}

async function updateCourse(id, token, data) {
    if (hasPermissionAdmin(token)){
        try {
            let course = await Course.update(data, {
                where: {
                    id: id
                }
            });
            return {
                error: false,
                message: 'Curso atualizado com sucesso',
                course: course
            }
        }catch (error) {
            requestLogger.error('Erro ao atualizar curso: ' + error.message);
            return {
                error: true,
                message: 'Erro ao atualizar curso' + data.name,
                error_message: error.message,
            }
        }
    }else {
        requestLogger.error('tentaiva de atualizar curso sem permissão');
        return {
            error: true,
            message: 'Você não tem permissão para atualizar um curso',
        }
    }

}

async function getCourses(token, consult) {
  let { all, id, name, tags, category, participants } = consult;

  if (participants && !hasPermissionAdmin()) {
    requestLogger.error('Tentativa de acessar cursos sem permissão de administrador');
    return {
      error: true,
      message: 'Você não tem permissão para acessar os cursos'
    };
  }

  try {
    console.log(all, id, name, tags, category, participants)
    const whereClause = all
      ? {} // Se "all" for true, não aplicamos nenhum filtro
      : {
          [Op.and]: [
            id ? { id } : {},
            name ? { name } : {},
            tags.length > 0 ? { tags: { [Op.contains]: tags } } : {}
          ]
        };

    console.log(whereClause)
    let includeClause = null;

    if (participants && category) {
      includeClause = [
        {
          model: Category,
          as: 'category',
          attributes: ['name', 'description']
        },
        {
          model: User,
          as: 'participants',
          attributes: ['name', 'email']
        }
      ];
    } else if (category) {
      includeClause = [
        {
          model: Category,
          as: 'category',
          attributes: ['name', 'description']
        }
      ];
    }

    const courses = await Course.findAll({
      where: whereClause,
      include: includeClause
    });

    requestLogger.info(`${courses.length} Cursos encontrados`);
    return {
      error: false,
      message: `${courses.length} Cursos encontrados`,
      courses: courses
    };
  } catch (error) {
    requestLogger.error('Erro ao buscar cursos: ' + error.message);
    return {
      error: true,
      message: 'Erro ao buscar cursos',
      error_message: error.message
    };
  }
}

module.exports = {
    createCourse,
    updateCourse,
    getCourses
}