const {
    ENTITY_STATUS
  } = require('../helper/constant')
  module.exports = (sequelize, DataTypes) => {
      const BrandEntity = sequelize.define(
        'BrandEntity',
        {
          id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },

          name: {
            type: DataTypes.STRING(255),
            unique:true,
            allowNull:false,

          },
          icon:{
              type: DataTypes.STRING(255),
              allowNull:true,
          },
          status: {
            type: DataTypes.ENUM(Object.values(ENTITY_STATUS)),
            allowNull:false,
         },
          
        },
        {
          freezeTableName: true,
          tableName: 'brands',
          underscored: true,
          timestamps: true
        }
      )
      return BrandEntity
    }
    