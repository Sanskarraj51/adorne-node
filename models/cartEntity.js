module.exports = (sequelize, DataTypes) => {
    const CartEntity = sequelize.define(
      'CartEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        user_id : {
            type :DataTypes.BIGINT,
            allowNull:false
        },
        product_id : {
            type :DataTypes.BIGINT,
            allowNull:false
        },
        sku : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        quantity : {
            type : DataTypes.BIGINT,
            allowNull : false,
            defaultValue: 1
        },
        price: {
          type: DataTypes.BIGINT(6).UNSIGNED,
          allowNull: false,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        }    
      },
      {
        freezeTableName: true,
        tableName: 'carts',
        underscored: true,
        timestamps: true
      }
    )
    return CartEntity
  }
  