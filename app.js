const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require("./models/index");
const PORT = process.env.PORT || 3030;


const adminRoute = require('./routes/auth.route');
const categoryRoute = require('./routes/category.route')
const brandRoute = require('./routes/brand.route')
const productRoute = require('./routes/product.route')
const colorRoute = require('./routes/color.route')
const sizeRoute = require('./routes/size.route');
const blogRoute = require('./routes/blog.route');
const bannerRoute = require('./routes/banner.route');
const wishlistRoute = require('./routes/wishlist.route');
const productvariantRoute = require('./routes/productvariant.route');
const cartRoute = require('./routes/cart.route');
const addressRoute = require('./routes/address.route');
const homeRoute = require('./routes/home.route');
const orderRoute = require('./routes/order.route');
const subscribeRoute = require('./routes/subscribe.route');
const ratingRoute = require('./routes/rating.route');

const publicCategoryRoute = require('./routes/category.public.route')
const publicBrandRoute = require('./routes/brand.public.route')
const publicProductRoute = require('./routes/product.public.route')
const authMiddleware = require('./middleware/auth')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'files')));

const origin = process.env.ALLOW_ORIGIN.split(',')
console.log('origin',origin)
app.use(cors({
    origin: origin,
}));

app.use('/api/v1/', adminRoute);
app.use('/api/v1/category', authMiddleware, categoryRoute);
app.use('/api/v1/brand', authMiddleware, brandRoute);
app.use('/api/v1/product', authMiddleware, productRoute);
app.use('/api/v1/colors', colorRoute);
app.use('/api/v1/sizes', sizeRoute);
app.use('/api/v1/blogs', blogRoute);
app.use('/api/v1/banners', bannerRoute);
app.use('/api/v1/wishlist', wishlistRoute);
app.use('/api/v1/productvariation', productvariantRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/address', addressRoute);
app.use('/api/v1/home', homeRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/subscribe', subscribeRoute);
app.use('/api/v1/rating', ratingRoute);

app.use('/api/v1/public/category',publicCategoryRoute)
app.use('/api/v1/public/brand',publicBrandRoute)
app.use('/api/v1/public/product',publicProductRoute)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = app.listen(PORT, function() {
  console.log('Ready on port %d', server.address().port);
});

module.exports = app;
