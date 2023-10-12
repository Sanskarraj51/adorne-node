const express = require("express");
const router = express.Router();
const {
  OrderEntity,
  OrderitemEntity,
  CartEntity,
  ProductEntity,
  CategoryEntity,
  BrandEntity,
  ProductImageEntity,
  AddressEntity,
} = require("../models");

router.post("/place-order", async (req, res) => {
  try {
    let getCartData = await CartEntity.findAll({
      where: { user_id: req.body.user_id, status: 1 },
    });

    let orderData = await OrderEntity.create({
      user_id: req.body.user_id,
      total: req.body.total,
      shipping_id: req.body.shipping_id,
    });

    getCartData.forEach(async (element) => {
      await OrderitemEntity.create({
        order_id: orderData.id,
        product_id: element.product_id,
        price: element.price,
        quantity: element.quantity,
        sku: element.sku,
      });
      await CartEntity.update({ status: 0 }, { where: { id: element.id } });
    });

    return res
      .status(200)
      .json({
        code: true,
        message: "Order Place successfully!",
        data: orderData,
      });
  } catch (err) {
    x;
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.post("/get-order", async (req, res) => {
  // try {
  let orderData = await OrderEntity.findAll({
    where: {
      user_id: req.body.user_id,
    },
    order: [["id", "desc"]],
    include: [
      {
        model: AddressEntity,
      },
      {
        model: OrderitemEntity,
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
      },
    ],
  });
  return res
    .status(200)
    .json({
      code: true,
      message: "Order fetched successfully!",
      data: orderData,
      mediaUrl: process.env.HOST + "/products/",
    });
  // }catch(err) {
  //     return res.status(err.http_code).json({ code: false , message : err.message})
  // }
});

router.get("/get-all-order", async (req, res) => {
  try {
    let orderData = await OrderEntity.findAll({
      order: [["id", "desc"]],
      include: [
        {
          model: AddressEntity,
        },
        {
          model: OrderitemEntity,
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
        },
      ],
    });
    return res
      .status(200)
      .json({
        code: true,
        message: "Order Place successfully!",
        data: orderData,
      });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.get("/cancel-order", async (req, res) => {
  try {
    await OrderEntity.update(
      { status: "Cancelled" },
      { where: { id: req.query.order_id } }
    );
    return res
      .status(200)
      .json({ code: true, message: "Order cancelled successfully!" });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.get("/update-status", async (req, res) => {
  try {
    await OrderEntity.update(
      { status: req.query.order_status },
      { where: { id: req.query.order_id } }
    );
    return res
      .status(200)
      .json({
        code: true,
        message: `Order ${req.query.order_status} successfully!`,
      });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

module.exports = router;
