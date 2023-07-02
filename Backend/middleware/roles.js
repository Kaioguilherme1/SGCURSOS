const {validateToken} = require("./AuthToken");
const {requestLogger} = require("../config/logger");

// Verifica se o usuário é admin ou é o dono do recurso
async function hasPermissionUser(token, user_id) {
    try {
        // Verificar se o token é válido e decodificá-lo
        const decoded = await validateToken(token);
        if (!decoded.valid) {
            requestLogger.error(`Token inválido: ${token}`);
            return false;
        }
        const userId = parseInt(decoded.payload.id);
        const profile = decoded.payload.profile;
        const suspended = decoded.payload.suspended;
        // console.log(`userId: ${userId} | user_id: ${user_id} | profile: ${profile} | decoded: ${JSON.stringify(decoded)} | suspended: ${suspended}`);
        return ((profile === `admin` || parseInt(userId) === parseInt(user_id) || profile === `root`) && suspended === false);
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false; // Ocorreu um erro na verificação do token
    }
}

// Verifica se o usuário é admin
async function hasPermissionAdmin(token) {
    try {
        // Verificar se o token é válido e decodificá-lo
        const decoded = await validateToken(token);
        if (decoded.valid === false) {
            requestLogger.error(`Token inválido: ${token}`);
            return false;
        }
        const profile = decoded.payload.profile;
        const suspended = decoded.payload.suspended;
        return ((profile === `admin` || profile === `root`) && suspended === false);
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false; // Ocorreu um erro na verificação do token
    }
}

module.exports = {hasPermissionAdmin, hasPermissionUser   };