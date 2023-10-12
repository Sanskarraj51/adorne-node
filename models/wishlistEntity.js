module.exports = (sequelize, DataTypes) => {
    const WishlistEntity = sequelize.define(
      'WishlistEntity',
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
        user_id : {
            type: DataTypes.BIGINT,
            allowNull: false

        },
        status : {
            type: DataTypes.TINYINT(1),
            defaultValue: 1
        }                
      },
      {
        freezeTableName: true,
        tableName: 'wishlists',
        underscored: true,
        timestamps: true
      }
    )
    return WishlistEntity
  }
  