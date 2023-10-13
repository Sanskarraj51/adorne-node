const {
    ENTITY_STATUS
  } = require('../helper/constant')
  module.exports = (sequelize, DataTypes) => {
      const ProductEntity = sequelize.define(
        'ProductEntity',
        {
          id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },

          name: {
            type: DataTypes.STRING(255),
            allowNull:false,
          },

          description:{
            type: DataTypes.STRING(1000),
            allowNull:false,
          },
          shortDescription:{
            type: DataTypes.STRING(355),
            allowNull:false,
          },

          category_id:{
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
          },

          brand_id:{
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
          },

          price:{
            type: DataTypes.FLOAT,
            allowNull: false,
          },

          sku_id:{
            type: DataTypes.STRING(255),
            allowNull:false,
          },

          length:{
            type: DataTypes.BIGINT(6),
            allowNull: false,
          },

          width:{
            type: DataTypes.BIGINT(6),
            allowNull: false,
          },

          height:{
            type: DataTypes.BIGINT(6),
            allowNull: false,
          },

          weight:{
            type: DataTypes.BIGINT(6),
            allowNull: false,
          },

          qty:{
            type: DataTypes.BIGINT(6),
            allowNull: false,
          },

          status: {
            type: DataTypes.ENUM(Object.values(ENTITY_STATUS)),
            allowNull:false,
         },
          
        },
        {
          freezeTableName: true,
          tableName: 'products',
          underscored: true,
          timestamps: true
        }
      )
      return ProductEntity
    }
    