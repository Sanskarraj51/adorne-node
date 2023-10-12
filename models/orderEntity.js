module.exports = (sequelize, DataTypes) => {
    const OrderEntity = sequelize.define(
      'OrderEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull:false,
        },
        total : {
            type: DataTypes.BIGINT,
            defaultValue : 0
        },
        shipping_id : {
            type: DataTypes.BIGINT,
            allowNull:false,
        },
        status : {
            type : DataTypes.STRING,
            defaultValue : 'Active'
        }
      
                
      },
      {
        freezeTableName: true,
        tableName: 'orders',
        underscored: true,
        timestamps: true
      }
    )
    return OrderEntity
  }
  