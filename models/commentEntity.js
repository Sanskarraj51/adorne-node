module.exports = (sequelize, DataTypes) => {
    const CommentEntity = sequelize.define(
      'CommentEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        comment: {
            type: DataTypes.STRING(255),
            allowNull:false,
        },

        name: {
          type: DataTypes.STRING(255),
          allowNull:false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull:true,
          },
        postId : {
            type : DataTypes.BIGINT
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        }    
      },
      {
        freezeTableName: true,
        tableName: 'comments',
        underscored: true,
        timestamps: true
      }
    )
    return CommentEntity
  }
  