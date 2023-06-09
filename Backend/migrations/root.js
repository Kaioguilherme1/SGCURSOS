'use strict';
const {root} = require('../config/auth')

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { username: 'root' }, {});
  }
};
