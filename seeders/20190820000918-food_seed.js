'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [{
      name: 'Banana',
      calories: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mint',
      calories: 14,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {})
  }
};
