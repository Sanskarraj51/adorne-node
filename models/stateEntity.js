const {
    ENTITY_STATUS
  } = require('../helper/constant')
  module.exports = (sequelize, DataTypes) => {
      const StateEntity = sequelize.define(
        'StateEntity',
        {
          id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          country_id:{
            type: DataTypes.BIGINT(11).UNSIGNED,
            default:1
          },
          name: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          
        },
        {
          freezeTableName: true,
          tableName: 'states',
          underscored: true,
          timestamps: true
        }
      )
      return StateEntity
    }
    