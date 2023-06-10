const crypto = require('crypto');
const {certificateSecret} = require('../config/auth');
const secret = certificateSecret.secret;

function generateCourseValidation(registration_code) {
  const data = secret + registration_code.toString();
  const hmac = crypto.createHmac('sha256', secret);
  const key = hmac.update(data).digest('hex').toUpperCase().substring(0, 16);
  const regex = /(.{4})/g;
  const formattedKey = key.replace(regex, '$1-');
  return formattedKey.slice(0, -1); // Remover o último hífen
}

function validateCourse(registration_code ,hashKey) {
  const hashKeyGenerate = generateCourseValidation(registration_code,secret);
  return  hashKeyGenerate === hashKey;
}

module.exports = {generateCourseValidation, validateCourse};
