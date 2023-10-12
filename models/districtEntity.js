const {
    ENTITY_STATUS
  } = require('../helper/constant')
  module.exports = (sequelize, DataTypes) => {
      const DistrictEntity = sequelize.define(
        'DistrictEntity',
        {
          id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },

          state_id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
          },

          name: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          
        },
        {
          freezeTableName: true,
          tableName: 'districts',
          underscored: true,
          timestamps: true
        }
      )
      return DistrictEntity
    }
    