module.exports = (sequelize, DataTypes) => {
    const BannerEntity = sequelize.define(
      'BannerEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        heading: {
            type: DataTypes.STRING(255),
            allowNull:false,
        },

        description: {
          type: DataTypes.TEXT,
          allowNull:false,
        },
        bannerImage: {
            type: DataTypes.STRING(255),
            allowNull:true,
        },
        
        bannerPosition: {
          type: DataTypes.STRING,
          defaultValue: 'main'
        },
        
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        }    
      },
      {
        freezeTableName: true,
        tableName: 'banners',
        underscored: true,
        timestamps: true
      }
    )
    return BannerEntity
  }
  