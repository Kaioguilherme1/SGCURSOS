
const {Course, User , Registration , Certificate} = require('../models/index');
const {Op} = require("sequelize");
const TokenController = require("../middleware/AuthToken");
const {hasPermissionAdmin, hasPermissionUser} = require("../middleware/roles");
const {requestLogger} = require("../config/logger");

async function createRegistration(token, { user_id, course_id }) {
  let user = null;
  let course = null;
  user = user_id;
  course = course_id;
  if (user_id && course_id) {
  user = user_id;
  course = course_id;
  } else {
      return {
          error: true,
          message: 'Usuário ou curso não informado'
      };
  }

  const register = await Registration.findOne({
    where: {
      User_id: user,
      Course_id: course
    }
  });

  if (register) {
    requestLogger.error('Usuário já está matriculado no curso');
    return {
      error: true,
      message: 'Usuário já está matriculado no curso'
    };
  }

  try {
    const registration = await Registration.create({
      User_id: user_id,
      Course_id: course_id
    });

    requestLogger.info('Matrícula criada');
    return {
      error: false,
      message: 'Matrícula criada com sucesso',
      registration
    };
  } catch (error) {
    requestLogger.error('Erro ao criar matrícula: ' + error.message);
    return {
      error: true,
      message: 'Erro ao criar matrícula',
      error_message: error.message
    };
  }
}

async function updateRegistration(id, token, data) {
  try {
    const registration = await Registration.findByPk(id);

    if (!registration) {
      return {
        error: true,
        message: 'Matrícula não encontrada'
      };
    }

    if (!await hasPermissionAdmin(token)) {
        requestLogger.error('Tentativa de atualizar matrícula sem permissão de administrador');
      // Remover a atualização da nota final se o usuário não for um administrador
      delete data.final_grade;
    }

    // Remover a atualização do certificado
    delete data.certificate;
    try {
        await registration.update(data);
    }catch (error){
        requestLogger.error('Erro ao atualizar matrícula: ' + error.message);
        return {
            error: true,
            message: 'Erro ao atualizar matrícula',
            error_message: error.message
        };
    }

    requestLogger.info('Matrícula atualizada');
    return {
      error: false,
      message: 'Matrícula atualizada com sucesso',
      registration
    };
  } catch (error) {
    requestLogger.error('Erro ao atualizar matrícula: ' + error.message);
    return {
      error: true,
      message: 'Erro ao atualizar matrícula',
      error_message: error.message
    };
  }
}

async function getRegistrations(token, data) {
  const { id, course, user, certificate, all } = data;
  if (user  && !await hasPermissionUser(token, user)) {
    requestLogger.error('Tentativa de acessar matrícula por usuário sem permissão de dono da conta');
    return {
      error: true,
      message: 'Você não tem permissão para acessar a matrícula por usuário'
    };
  }

  if (certificate && !await hasPermissionUser(token, user)) {
    requestLogger.error('Tentativa de acessar matrícula por certificado sem permissão de administrador');
    return {
      error: true,
      message: 'Você não tem permissão para acessar a matrícula por certificado'
    };
  }

  try {
    const whereClause =
      {
          [Op.and]: [
            id ? { id } : {},
            course ? { Course_id: course } : {},
            user ? { User_id: user } : {},
          ]
        };

    let includeClause = [];

    if (user || all) {
      includeClause.push({
        model: User,
        attributes: ['name', 'email']
      });
    }

    if (course || all) {
      includeClause.push({
        model: Course,
        attributes: ['name', 'description']
      });
    }

    if (certificate || all) {
      includeClause.push({
        model: Certificate,
      });
    }
    let registration
    if (all){
        registration = await Registration.findAll({
            where: whereClause,
            include: includeClause
        });
    }else {
        registration = await Registration.findOne({
            where: whereClause,
            include: includeClause
        });
    }

    if (!registration) {
      return {
        error: true,
        message: 'Matrícula não encontrada'
      };
    }

    requestLogger.info('Matrícula encontrada');
    return {
      error: false,
      message: 'Matrícula encontrada',
      registration: registration
    };
  } catch (error) {
    requestLogger.error('Erro ao buscar matrícula: ' + error.message);
    return {
      error: true,
      message: 'Erro ao buscar matrícula',
      error_message: error.message
    };
  }
}

async function deleteRegistration(id, token) {
    if (!await hasPermissionUser(token)) {
        requestLogger.error('Tentativa de deletar matrícula sem permissão de administrador');
        return {
        error: true,
        message: 'Você não tem permissão para deletar matrículas'
        };
    }

    try {
        const registration = await Registration.findOne({
        where: {
            id
        }
        });

        if (!registration) {
        return {
            error: true,
            message: 'Matrícula não encontrada'
        };
        }

        await registration.destroy();

        requestLogger.info('Matrícula deletada');
        return {
        error: false,
        message: 'Matrícula deletada'
        };
    } catch (error) {
        requestLogger.error('Erro ao deletar matrícula: ' + error.message);
        return {
        error: true,
        message: 'Erro ao deletar matrícula',
        error_message: error.message
        };
    }

}

module.exports = {
    createRegistration,
    getRegistrations,
    deleteRegistration,
    updateRegistration
}
