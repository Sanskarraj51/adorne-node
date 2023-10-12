module.exports = (sequelize, DataTypes) => {
    const BlogEntity = sequelize.define(
      'BlogEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull:false,
        },

        post: {
          type: DataTypes.TEXT('tiny'),
          allowNull:false,
        },
        postImage: {
            type: DataTypes.STRING(255),
            allowNull:true,
          },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        }    
      },
      {
        freezeTableName: true,
        tableName: 'posts',
        underscored: true,
        timestamps: true
      }
    )
    return BlogEntity
  }
  