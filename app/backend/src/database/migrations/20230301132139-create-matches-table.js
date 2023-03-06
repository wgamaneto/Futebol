'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        field: 'home_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches')
  }
};
