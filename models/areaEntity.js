const {
    ENTITY_STATUS
  } = require('../helper/constant')
  module.exports = (sequelize, DataTypes) => {
      const AreaEntity = sequelize.define(
        'AreaEntity',
        {
          id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },

          district_id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
          },

          name: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          pincode: {
            type: DataTypes.BIGINT(6).UNSIGNED,
            allowNull: true,
          },
          
        },
        {
          freezeTableName: true,
          tableName: 'areas',
          underscored: true,
          timestamps: true
        }
      )
      return AreaEntity
    }
    