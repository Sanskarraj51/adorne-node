module.exports = (sequelize, DataTypes) => {
    const SubscriberEntity = sequelize.define(
      'SubscriberEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status : {
            type: DataTypes.TINYINT(1),
            defaultValue: 1
        }                
      },
      {
        freezeTableName: true,
        tableName: 'subscribers',
        underscored: true,
        timestamps: true
      }
    )
    return SubscriberEntity
  }
  