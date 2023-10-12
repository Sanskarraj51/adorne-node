const express = require('express');
const router = express.Router();
const { RatingEntity, ProductEntity, UserEntity } = require('../models');

router.post('/products/:product_id/ratings', async (req, res) => {
    try {
      const { product_id } = req.params;
      const { rating, user_id } = req.body;
  
      const product = await ProductEntity.findByPk(product_id);
      if (!product) {
        return res.status(404).json({code :true, message: 'Product not found' });
      }
  
      const newRating = await RatingEntity.create({ rating, user_id, product_id });
      return res.status(200).json({ code : true, message : "Rating successfully updated.", data : newRating });
    } catch (error) {
      console.error(error);
      return res.status(500).json({code : false,  error: 'Internal Server Error' });
    }
  });
  
  // List ratings for a product
  router.get('/products/:product_id/ratings', async (req, res) => {
    try {
      const { product_id } = req.params;
      const ratings = await RatingEntity.findAll({
        where: { product_id },
        include : [ { model : UserEntity } ],
        order : [['id', 'DESC']]
      });
      return res.json({ code : true, message : "All Ratings", data : ratings });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;