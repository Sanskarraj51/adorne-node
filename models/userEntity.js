const {
  ENTITY_STATUS,
  ENTITY_TYPE
} = require('../helper/constant')
module.exports = (sequelize, DataTypes) => {
    const UserEntity = sequelize.define(
      'UserEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        mobile:{
          type: DataTypes.BIGINT(12),
          allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        role:{
          type: DataTypes.ENUM(Object.values(ENTITY_TYPE)),
          allowNull:false,
        },
        status: {
            type: DataTypes.ENUM(Object.values(ENTITY_STATUS)),
            allowNull:false,
        },

        profile:{
          type: DataTypes.STRING(255),
          allowNull: true,
        },

      },
      {
        freezeTableName: true,
        tableName: 'users',
        underscored: true,
        timestamps: true
      }
    )

    return UserEntity
}



