const {
    ENTITY_STATUS
  } = require('../helper/constant')
  module.exports = (sequelize, DataTypes) => {
      const CategoryEntity = sequelize.define(
        'CategoryEntity',
        {
          id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },

          name: {
            type: DataTypes.STRING(55),
            unique:true,
            allowNull:false,

          },
          description:{
            type: DataTypes.STRING(255),
            allowNull:false,
          },
          status: {
            type: DataTypes.ENUM(Object.values(ENTITY_STATUS)),
            allowNull:false,
         },
          
        },
        {
          freezeTableName: true,
          tableName: 'categories',
          underscored: true,
          timestamps: true
        }
      )
      return CategoryEntity
    }
    