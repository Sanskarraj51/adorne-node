module.exports = (sequelize, DataTypes) => {
    const RatingEntity = sequelize.define(
      'RatingEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        product_id : {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status : {
            type: DataTypes.TINYINT(1),
            defaultValue: 1
        }                
      },
      {
        freezeTableName: true,
        tableName: 'ratings',
        underscored: true,
        timestamps: true
      }
    )
    return RatingEntity
  }
  