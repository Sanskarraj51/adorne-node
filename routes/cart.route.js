const express = require("express");
const router = express.Router();
const upload = require("../helper/productsUpload");
const {
  CartEntity,
  WishlistEntity,
  ProductEntity,
  CategoryEntity,
  BrandEntity,
  ProductImageEntity,
  ProductvariantEntity,
  SizeEntity,
  ColorsEntity,
} = require("../models");
const { Sequelize, DataTypes } = require("sequelize");

router.get("/get-cart", async (req, res) => {
  try{
  const CartData = await CartEntity.findAll({
    where: { user_id: req.query.user_id, status: 1 },
    include: [
      {
        model: ProductEntity,
        include: [
        //   { model: SizeEntity },
        //   { model: ColorsEntity },
          { model: CategoryEntity },
          { model: BrandEntity },
          { model: ProductImageEntity },
          // { model: ProductvariantEntity, where : { sku :  } }
        ],
      },
    ],
  });

  let tax = 0;
  let shippingCharges = 0;
  let subTotal = 0;

  const totalAmount = await CartEntity.findAll({
    attributes: [
      "user_id",
      [Sequelize.fn("sum", Sequelize.col("price")), "total_amount"],
    ],
    where: { user_id: req.query.user_id, status: 1 },
    group: ["user_id"],
    raw: true,
  });

  CartData.forEach(async (element) => {
    subTotal += element?.ProductEntity?.price * element?.quantity;
  });

  let respData = {
    mediaUrl: process.env.HOST + "/products/",
    products: CartData,
    subTotal: totalAmount,
    total: subTotal,
    tax: tax,
    shippingCharges: shippingCharges,
  };
  return res
    .status(200)
    .json({ code: true, message: "Cart list", data: respData });
  }catch(err){
      return res.status(err.http_code).json({ code: false , message : err.message})
  }
});

router.post("/move-to-cart", async (req, res) => {
  try {
    let wishlistData = await WishlistEntity.findOne({
      where: { id: req.body.wishlist_id },
    });
    // let productData = await ProductEntity.findOne({ where : { id : wishlistData.product_id } });
    let data = {
      product_id: wishlistData.product_id,
      user_id: req.body.user_id,
      quantity: 1,
      sku: req.body.sku,
    };

    let variantData = await ProductvariantEntity.findOne({ sku: req.body.sku });

    await CartEntity.create({
      product_id: wishlistData.product_id,
      user_id: req.body.user_id,
      status: 1,
      sku: req.body.sku,
      price: variantData.price,
      quantity: 1,
    });

    await WishlistEntity.update(
      { status: 0 },
      { where: { id: wishlistData.id } }
    );

    return res
      .status(200)
      .json({ code: true, message: "Product added to the cart" });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    await CartEntity.update(
      { quantity: req.body.quantity },
      { where: { id: req.body.cart_id } }
    );
    return res.status(200).json({ code: true, message: "cart updated." });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    let checkCartt = await CartEntity.findOne({
      where: {
        product_id: req.body.product_id,
        user_id: req.body.user_id,
        status: 1,
        sku: req.body.sku,
      },
    });
    if (checkCartt) {
      await CartEntity.update(
        { quantity: Sequelize.fn("1 + ", Sequelize.col("quantity")) },
        {
          where: {
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            status: 1,
            sku: req.body.sku,
          },
        }
      );
      return res
        .status(200)
        .json({ code: true, message: "Product added to the cart" });
    }

    let variantData = await ProductvariantEntity.findOne({ sku: req.body.sku });

    await CartEntity.create({
      product_id: req.body.product_id,
      user_id: req.body.user_id,
      status: 1,
      sku: req.body.sku,
      price: variantData.price,
      quantity: req.body.quantity,
    });

    return res
      .status(200)
      .json({ code: true, message: "Product added to the cart" });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.get("/empty-cart", async (req, res) => {
  try {
    await CartEntity.update(
      { status: 0 },
      { where: { id: req.query.user_id } }
    );
    return res
      .status(200)
      .json({ code: true, message: "All prooduct removed from cart." });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.get("/remove-product-from-cart", async (req, res) => {
  try {
    await CartEntity.update(
      { status: 0 },
      { where: { id: req.query.cart_id } }
    );
    return res
      .status(200)
      .json({ code: true, message: "Prooduct removed from cart." });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

module.exports = router;
