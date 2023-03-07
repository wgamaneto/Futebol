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
        field: 'home_team_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        field: 'away_team_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches')
  }
};
