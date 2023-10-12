module.exports = (sequelize, DataTypes) => {
      const ProductImageEntity = sequelize.define(
        'ProductImageEntity',
        {
          id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },

          product_id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull: false,
          },

          key: {
            type: DataTypes.STRING(255),
            allowNull:false,
          },
          
        },
        {
          freezeTableName: true,
          tableName: 'product_images',
          underscored: true,
          timestamps: true
        }
      )
      return ProductImageEntity
    }
    