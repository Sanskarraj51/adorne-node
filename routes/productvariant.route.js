const express = require("express");
const router = express.Router();
const {
  ProductvariantEntity,
  ProductselectedEntity,
  SizeEntity,
  ColorsEntity,
} = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.post("/add-product-variant", async (req, res) => {
  try {
    const entity = await ProductvariantEntity.findOne({
      where: { product_id: req.body.product_id, sku: req.body.sku },
      raw: true,
    });
    if (entity) {
      return res
        .status(200)
        .json({ code: true, message: "SKU already exists" });
    }

    await ProductvariantEntity.create({
      product_id: req.body.product_id,
      sku: req.body.sku,
      color: req.body.color,
      size: req.body.size,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    return res
      .status(200)
      .json({ code: true, message: "Product variation added" });
  } catch (error) {
    return res
      .status(error.http_code)
      .json({ code: false, message: error.message });
  }
});

router.post("/select-attribute", async (req, res) => {
  try {
    let checkAttributes = await ProductselectedEntity.findOne({
      where: { product_id: req.body.product_id },
    });

    if (checkAttributes) {
      if (req.body.size !== null) {
        // await ProductselectedEntity.update({ size : req.body.size, color : req.body.color },{ where : { product_id : req.body.product_id }});
        await ProductselectedEntity.update(
          { size: req.body.size },
          { where: { product_id: req.body.product_id } }
        );
      }
      if (req.body.color !== null) {
        await ProductselectedEntity.update(
          { color: req.body.color },
          { where: { product_id: req.body.product_id } }
        );
      }
    } else {
      // await ProductselectedEntity.create({ product_id : req.body.product_id, size : req.body.size, color : req.body.color });
      if (req.body.size && req.body.color) {
        await ProductselectedEntity.create({
          product_id: req.body.product_id,
          size: req.body.size,
          color: req.body.color,
        });
      }

      if (req.body.size) {
        await ProductselectedEntity.create({
          product_id: req.body.product_id,
          size: req.body.size,
        });
      }

      if (req.body.color) {
        await ProductselectedEntity.create({
          product_id: req.body.product_id,
          color: req.body.color,
        });
      }
    }
    return res
      .status(200)
      .json({ code: true, message: "Product attributed selected" });
  } catch (error) {
    return res
      .status(error.http_code)
      .json({ code: false, message: error.message });
  }
});

router.post("/get-variant", async (req, res) => {
  try {
    let filter = [];
    if (req.body.size) {
      filter.push({ size: req.body.size });
    } else if (req.body.color) {
      filter.push({ color: req.body.color });
    }

    let getVariantData = await ProductvariantEntity.findOne({
      where: {
        product_id: req.body.product_id,
        [Op.or]: filter,
      },
      include: [{ model: SizeEntity }, { model: ColorsEntity }],
    });

    // let variantDetail = {};
    // if(getVariantData) {
    //     let variant = getVariantData.variation.split(',');
    //     variantDetail.size = await SizeEntity.findOne({ where : { id : variant[0] } });
    //     variantDetail.color = await SizeEntity.findOne({ where : { id : variant[1] } });

    // }
    // let responseData = {
    //     getVariantData, variantDetail
    // }
    return res.status(200).json({
      code: true,
      message: "Product attributed selected",
      data: getVariantData,
    });
  } catch (error) {
    return res
      .status(error.http_code)
      .json({ code: false, message: error.message });
  }
});

// router.get('/get-colors', async ( req , res )=>{
//     try{
//         const colors = await ColorsEntity.findAll({ })
//         return res.status(200).json({ code : true , message: "Colors added" , data : colors})
//     }catch(err){
//         return res.status(error.http_code).json({ code: false , message : err.message})
//     }
// });

router.post("/update", async (req, res) => {
  try {
    await ProductvariantEntity.update(
      {
        price: req.body.price,
        quantity: req.body.quantity,
        size: req.body.size,
        color: req.body.color,
      },
      { where: { id: req.body.variant_id } }
    );

    return res
      .status(200)
      .json({ code: true, message: "Product variants updated" });
  } catch (err) {
    return res
      .status(error.http_code)
      .json({ code: false, message: err.message });
  }
});

router.get("/remove", async (req, res) => {
  try {
    await ProductvariantEntity.update(
      { status: 0 },
      { where: { id: req.query.variant_id } }
    );

    return res
      .status(200)
      .json({ code: true, message: "Product variant removed." });
  } catch (err) {
    return res
      .status(error.http_code)
      .json({ code: false, message: err.message });
  }
});

module.exports = router;
