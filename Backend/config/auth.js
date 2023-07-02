const bycrypt = require('bcrypt');

const auth = {
  secret: process.env.SECRET_TOKEN,
  expireIn: process.env.EXPIRE_IN,
};

const certificateSecret = {
  secret: process.env.SECRET_CERTIFICATE
};

const root = {
  name: `root`,
  number: `000000000`,
  email: 'root@root.com',
  username: `root`,
  password: bycrypt.hashSync("1234", 10), //precess.env.ROOT_PASSWORD
  profile: `root`
};

module.exports = {auth, root, certificateSecret};