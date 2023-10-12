const express = require("express");
const router = express.Router();
const upload = require("../helper/productsUpload");
const {
  WishlistEntity,
  ProductEntity,
  BrandEntity,
  ProductImageEntity,
  CategoryEntity,
} = require("../models");

router.get("/get-wishlist", async (req, res) => {
  try {
    const wishlists = await WishlistEntity.findAll({
      where: { user_id: req.query.user_id, status: 1 },
      include: [
        {
          model: ProductEntity,
          include: [
            { model: CategoryEntity },
            { model: BrandEntity },
            { model: ProductImageEntity },
          ],
        },
      ],
    });
    let respData = {
      mediaUrl: process.env.HOST + "/products/",
      posts: wishlists,
    };
    return res
      .status(200)
      .json({ code: true, message: "Wishlist list", data: respData });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.post("/add-wishlist", async (req, res) => {
  try {
    let checkWishlist = await WishlistEntity.findOne({
      where: {
        product_id: req.body.product_id,
        user_id: req.body.user_id,
        status: 1,
      },
    });
    if (checkWishlist) {
      return res.status(200).json({ code: true, message: "Already exists" });
    }

    await WishlistEntity.create({
      product_id: req.body.product_id,
      user_id: req.body.user_id,
    });

    return res.status(200).json({ code: true, message: "Wishlist list" });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.get("/remove-wishlist", async (req, res) => {
  try {
    await WishlistEntity.update(
      { status: 0 },
      { where: { id: req.query.wishlist_id } }
    );
    return res.status(200).json({ code: true, message: "Wishlist reemoved" });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

module.exports = router;
