module.exports = (sequelize, DataTypes) => {
    const UserAddressEntity = sequelize.define(
      'UserAddressEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            allowNull:false,
        },
        street:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        area: {
          type: DataTypes.STRING(55),
          allowNull: false,
        },
        city: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        pincode:{
          type: DataTypes.BIGINT(6).UNSIGNED,
          allowNull: false,
        },
        state: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        latitude:{
          type: DataTypes.STRING(55),
            allowNull: true,
        },
        longitute:{
          type: DataTypes.STRING(55),
            allowNull: true,
        }
      },
      {
        freezeTableName: true,
        tableName: 'users_address',
        underscored: true,
        timestamps: true
      }
    )

    return UserAddressEntity
  }
  