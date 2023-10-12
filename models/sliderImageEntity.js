module.exports = (sequelize, DataTypes) => {
    const SliderImageEntity = sequelize.define(
      'SliderImageEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(255),
            allowNull:false,
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull:false,
        },

        key: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

      },
      {
        freezeTableName: true,
        tableName: 'slider_images',
        underscored: true,
        timestamps: true
      }
    )
    return SliderImageEntity
  }
  