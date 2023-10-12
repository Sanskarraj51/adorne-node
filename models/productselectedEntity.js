module.exports = (sequelize, DataTypes) => {
    const ProductselectedEntity = sequelize.define(
      'ProductselectedEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        product_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
  
        size : {
            type: DataTypes.STRING,
            allowNull: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true
        },
   
        status : {
            type: DataTypes.TINYINT(1),
            defaultValue: 1
        }                
      },
      {
        freezeTableName: true,
        tableName: 'productattributes',
        underscored: true,
        timestamps: true
      }
    )
    return ProductselectedEntity
  }
  