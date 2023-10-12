module.exports = (sequelize, DataTypes) => {
    const OrderitemEntity = sequelize.define(
      'OrderitemEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        order_id : {
            type: DataTypes.BIGINT,
            allowNull:false,
        },
        product_id: {
            type: DataTypes.BIGINT,
            allowNull:false,
        },
        price : {
            type: DataTypes.BIGINT,
            defaultValue : 0
        },
        quantity : {
            type: DataTypes.BIGINT,
            defaultValue : 0
        },
        sku : {
            type : DataTypes.STRING,
            defaultValue : 'Active'
        },
        status : {
            type : DataTypes.STRING,
            defaultValue : 'Active'
        }
      
                
      },
      {
        freezeTableName: true,
        tableName: 'orderitems',
        underscored: true,
        timestamps: true
      }
    )
    return OrderitemEntity
  }
  