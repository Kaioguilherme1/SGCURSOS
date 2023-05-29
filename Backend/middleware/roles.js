const {validateToken} = require("./AuthToken");

// Verifica se o usuário é admin ou é o dono do recurso
function hasPermissionUser(token, user_id, role = 'admin') {
    try {
        // Verificar se o token é válido e decodificá-lo
        const decoded = validateToken(token);
        const userId = decoded.id;
        const profile = decoded.profile;
        return profile === role || userId === user_id;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false; // Ocorreu um erro na verificação do token
    }
}


// Verifica se o usuário é admin
function hasPermissionAdmin(token, role = 'admin') {
  try {
    // Verificar se o token é válido e decodificá-lo
    const decoded = validateToken(token);
    const profile = decoded.profile;
    return profile === role;
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    return false; // Ocorreu um erro na verificação do token
  }
}

module.exports = {hasPermissionAdmin, hasPermissionUser};