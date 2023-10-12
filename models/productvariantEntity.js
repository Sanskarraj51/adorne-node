module.exports = (sequelize, DataTypes) => {
    const ProductvariantEntity = sequelize.define(
      'ProductvariantEntity',
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
        sku : {
            type: DataTypes.STRING,
            allowNull: false

        },
        variation : {
            type: DataTypes.STRING,
            allowNull: true
        },
        color : {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        size : {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue : 0
        },
        status : {
            type: DataTypes.TINYINT(1),
            defaultValue: 1
        }                
      },
      {
        freezeTableName: true,
        tableName: 'productvariants',
        underscored: true,
        timestamps: true
      }
    )
    return ProductvariantEntity
  }
  