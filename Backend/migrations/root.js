const {root} = require('../config/auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingRoot = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE username = '${root.username}'`
    );

    if (existingRoot[0].length === 0) {
      return queryInterface.bulkInsert('Users', [{
        name: root.name,
        number: root.number,
        email: root.email,
        username: root.username,
        password: root.password,
        profile: root.profile,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    } else {
      console.log('Root Já existe!, pulando a criação...');
      return Promise.resolve();
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { username: 'root' }, {});
  }
};
