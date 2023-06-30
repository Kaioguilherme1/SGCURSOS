const bycrypt = require('bcrypt');

const auth = {
  secret: "e393d742b17a4c74515b02e6c62da24518d3747f774244e3e0d1a3a209b99e3c" , //process.env.SECRET_TOKEN,
  expireIn: "6h",
};

const certificateSecret = {
  secret: '1309122d84371261e3e45ae3805007cf' //process.env.SECRET_CERTIFICATE
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