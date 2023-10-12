module.exports = (sequelize, DataTypes) => {
    const SizeEntity = sequelize.define(
      'SizeEntity',
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

        // code: {
        //   type: DataTypes.STRING(255),
        //   allowNull:false,
        // },
                
      },
      {
        freezeTableName: true,
        tableName: 'sizes',
        underscored: true,
        timestamps: true
      }
    )
    return SizeEntity
  }
  