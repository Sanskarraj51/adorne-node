module.exports = (sequelize, DataTypes) => {
    const AddressEntity = sequelize.define(
      'AddressEntity',
      {
        id: {
          type: DataTypes.BIGINT(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        user_id : {
            type :DataTypes.BIGINT,
            allowNull:false
        },
        full_name : {
            type : DataTypes.STRING,
            allowNull: false,

        },

        address1 : {
            type : DataTypes.STRING,
            allowNull: false
        },
        address2 : {
            type : DataTypes.STRING,
            allowNull: true
        },
        email : {
            type : DataTypes.STRING,
            allowNull: false
        },
        address_type : {
            type: DataTypes.STRING,
            defaultValue: 'other'
        },
        city : {
            type : DataTypes.STRING,
            allowNull: false
        },
        state : {
            type : DataTypes.STRING,
            allowNull: false
        },
        country : {
            type : DataTypes.STRING,
            allowNull: false
        },
        pin : {
            type : DataTypes.STRING,
            allowNull: false
        },
        phone : {
            type : DataTypes.BIGINT,
            allowNull: false
        },
        isDefault : {
            type : DataTypes.TINYINT,
            defaultValue : 0
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        }    
      },
      {
        freezeTableName: true,
        tableName: 'addresses',
        underscored: true,
        timestamps: true
      }
    )
    return AddressEntity
  }
  