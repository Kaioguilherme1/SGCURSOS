const {validateToken} = require("./AuthToken");

// Verifica se o usuário é admin ou é o dono do recurso
async function hasPermissionUser(token, user_id) {
    try {
        // Verificar se o token é válido e decodificá-lo
        const decoded = await validateToken(token);
        const userId = decoded.id;
        const profile = decoded.profile;
        return profile === `admin` || userId === user_id || profile === `root`;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false; // Ocorreu um erro na verificação do token
    }
}


// Verifica se o usuário é admin
async function hasPermissionAdmin(token) {
    try {
        // Verificar se o token é válido e decodificá-lo
        const decoded = await validateToken(token).payload;
        if (decoded && decoded.profile) {
            return { valid: true, payload: decoded };
        } else {
            return { valid: false, error: 'Token inválido' };
        }
        console.log(decoded)
        console.log(profile)
        return profile === `admin` || profile === `root`;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false; // Ocorreu um erro na verificação do token
    }
}

module.exports = {hasPermissionAdmin, hasPermissionUser   };