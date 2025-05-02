'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roadmap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roadmap.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  }
  Roadmap.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'UserId cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'UserId cannot be empty'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },
    roadmap: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Roadmap cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Roadmap cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Roadmap',
  });
  return Roadmap;
};