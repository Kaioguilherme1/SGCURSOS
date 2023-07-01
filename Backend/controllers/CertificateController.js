const {Course, User , Registration , Certificate} = require('../models/index');
const {Op} = require("sequelize");
const TokenController = require("../middleware/AuthToken");
const {hasPermissionAdmin, hasPermissionUser} = require("../middleware/roles");
const {requestLogger} = require("../config/logger");
const {generateCourseValidation, validateCourse} = require("../middleware/Certificate");

async function createCertificate(token, consult) {
    const {registrationId} = consult
    let registration

    if (registrationId == null) {
        return {
            error: true,
            message: 'Matrícula não informada'
        }
    }

    try {
        registration = await Registration.findOne({
            where: {
                id: registrationId
            },
            include: [
                {
                    model: Course,
                },
                {
                    model: User,
                },
                {
                    model: Certificate,
                }
            ]
        })
    } catch (error) {
        requestLogger.error(error.message)
        return {
            error: true,
            message: 'Erro ao buscar matrícula',
            error_message: error.message
        }
    }
    if (registration.Certificate_id) {
        return {
            error: true,
            message: 'Matrícula já possui certificado'
        }
    }

    try {
        if (await hasPermissionUser(token, registration.User.id)) {
            if (registration.final_grade < 7 || registration.final_grade == null) {
                requestLogger.log('info', 'Usuário possui nota suficiente para gerar certificado', {registration: registration.id})
                return {
                    error: true,
                    message: 'Usuário não possui nota suficiente para gerar certificado'
                }
            }

            if (registration.progress_time <= 90) {
                requestLogger.log('info', 'Usuário não possui progresso suficiente para gerar certificado', {registration: registration.id})
                return {
                    error: true,
                    message: 'Usuário não possui progresso suficiente para gerar certificado'
                }
            }

            try {
                const certificate = await Certificate.create({
                    name: registration.User.name,
                    course_name: registration.Course.name,
                    course_duration: registration.Course.duration_hours,
                    registration_id: registration.id.toString().padStart(8, '0'),
                    issued_at: new Date(),
                    final_grade: registration.final_grade,
                    validate_code: generateCourseValidation(registration.id.toString().padStart(8, '0'))
                })

                let updatedRegistration = await Registration.update({
                    Certificate_id: certificate.id
                }, {
                    where: {
                        id: registration.id
                    }
                })

                requestLogger.log('info', 'Certificado criado com sucesso', {certificate: certificate.id})
                return {
                    error: false,
                    message: 'Certificado criado com sucesso',
                    certificate: certificate
                }
            } catch (error) {
                requestLogger.error(error.message)
                return {
                    error: true,
                    message: 'Erro ao criar certificado',
                    error_message: error.message
                }
            }
        } else {
            return {
                error: true,
                message: 'Usuário não tem permissão para criar certificado'
            }
        }
    } catch (error) {
        requestLogger.error(error.message)
        return {
            error: true,
            message: 'Erro ao verificar permissão',
            error_message: error.message
        }
    }
}

async function validate(code){
    const {validate_code} = code
    let certificate;
    try {
        certificate = await Certificate.findOne({
            where: {
                validate_code: validate_code
            }
        })
    } catch (error) {
        requestLogger.error(error.message)
        return {
            error: true,
            message: 'Erro ao buscar certificado',
            error_message: error.message
        }
    }

    if (!certificate) {
        return {
            error: true,
            message: 'Certificado não encontrado'
        }
    }
    if (validateCourse(certificate.registration_id, validate_code)) {
        return {
            error: false,
            message: 'Certificado válido',
            certificate: certificate
        }
    } else {
        return {
            error: true,
            message: 'Certificado inválido'
        }
    }
}

module.exports = {
    createCertificate,
    validate
}