const fs = require('fs')
const path = require('path')
require('dotenv').config()
const {Sequelize , DataTypes} = require('sequelize')

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port:3306
});


sequelize.authenticate().then(()=> console.log('connected')).catch((err)=>console.log('error',err))

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* These are the model of database  */
db.UserEntity = require('./userEntity')(sequelize , DataTypes)
db.UserAddressEntity = require('./userAddressEntity')(sequelize , DataTypes)
db.StateEntity = require('./stateEntity')(sequelize , DataTypes)
db.DistrictEntity = require('./districtEntity')(sequelize , DataTypes)
db.AreaEntity = require('./areaEntity')(sequelize , DataTypes)
db.CategoryEntity = require('./categoryEntity')(sequelize , DataTypes)
db.BrandEntity = require('./brandEntity')(sequelize , DataTypes)
db.ProductEntity = require('./productEntity')(sequelize , DataTypes)
db.ProductImageEntity = require('./productImageEntity')(sequelize , DataTypes)
db.SliderImageEntity = require('./sliderImageEntity')(sequelize , DataTypes)
db.ColorsEntity = require('./colorsEntity')(sequelize , DataTypes)
db.SizeEntity = require('./SizeEntity')(sequelize , DataTypes)
db.BlogEntity = require('./BlogEntity')(sequelize , DataTypes)
db.CommentEntity = require('./commentEntity')(sequelize , DataTypes);
db.BannerEntity = require('./bannerEntity')(sequelize , DataTypes);
db.WishlistEntity = require('./wishlistEntity')(sequelize , DataTypes);
db.ProductvariantEntity = require('./productvariantEntity')(sequelize , DataTypes);
db.CartEntity = require('./cartEntity')(sequelize , DataTypes);
db.AddressEntity = require('./addressEntity')(sequelize , DataTypes);
db.ProductselectedEntity = require('./productselectedEntity')(sequelize , DataTypes);
db.OrderEntity = require('./orderEntity')(sequelize , DataTypes);
db.OrderitemEntity = require('./orderitemEntity')(sequelize , DataTypes);
db.SubscriberEntity = require('./subscribeEntity')(sequelize , DataTypes);
db.RatingEntity = require('./ratingEntity')(sequelize , DataTypes);


db.CategoryEntity.hasOne(db.ProductEntity, { foreignKey: 'category_id'});
db.ProductEntity.belongsTo(db.CategoryEntity, { foreignKey: 'category_id'});

db.BrandEntity.hasOne(db.ProductEntity, { foreignKey: 'brand_id'});
db.ProductEntity.belongsTo(db.BrandEntity, { foreignKey: 'brand_id'});

db.ProductEntity.hasMany(db.ProductvariantEntity, {foreignKey: 'product_id'});

db.ProductImageEntity.belongsTo(db.ProductEntity, { foreignKey: 'product_id'});
db.ProductEntity.hasMany(db.ProductImageEntity, { foreignKey: 'product_id'});

db.WishlistEntity.belongsTo(db.ProductEntity, { foreignKey: 'product_id' });

db.ProductvariantEntity.belongsTo(db.SizeEntity, { foreignKey : 'size' });
db.ProductvariantEntity.belongsTo(db.ColorsEntity, { foreignKey : 'color' });

db.RatingEntity.belongsTo(db.UserEntity, { foreignKey : 'user_id' });
db.ProductEntity.hasMany(db.RatingEntity, { foreignKey: 'product_id' });

db.CartEntity.belongsTo(db.ProductEntity, { foreignKey: 'product_id'  })

db.OrderEntity.hasMany(db.OrderitemEntity, { foreignKey: 'order_id' });
db.OrderitemEntity.belongsTo(db.ProductEntity, { foreignKey: 'product_id' });
db.OrderEntity.belongsTo(db.AddressEntity, { foreignKey: 'shipping_id' });

db.sequelize.sync({ sync: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

module.exports = db;
