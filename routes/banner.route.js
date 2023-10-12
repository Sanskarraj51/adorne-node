const express = require("express");
const router = express.Router();
const upload = require("../helper/productsUpload");
const { BannerEntity } = require("../models");
const { HttpException } = require("../exception/http.exception");
// const bannerEntity = require('../models/bannerEntity');

router.post("/add-banner", upload.single("bannerImage"), async (req, res) => {
  try {
    const entity = await BannerEntity.findOne({
      where: { heading: req.body.heading },
    });
    if (entity) {
      throw new HttpException(422, "Already exists");
    }
    if (req.body.bannerPosition === "side") {
      const sideCheck = await BannerEntity.count({
        where: { bannerPosition: "side" },
      });
      if (sideCheck >= 2)
        throw new HttpException(
          422,
          "Please remove side banner first then you can add side banner"
        );
    }
    await BannerEntity.create({
      heading: req.body.heading,
      description: req.body.description,
      bannerImage: req.file.filename,
      bannerPosition: req.body.bannerPosition,
    });

    return res.status(200).json({ code: true, message: "Banner added" });
  } catch (error) {
    return res
      .status(error.http_code)
      .json({ code: false, message: error.message });
  }
});

router.get("/get-banners", async (req, res) => {
  try {
    const banners = await BannerEntity.findAll({ where: { status: 1 } });
    let respData = {
      mediaUrl: process.env.HOST + "/products/",
      posts: banners,
    };
    return res
      .status(200)
      .json({ code: true, message: "Banner list", data: respData });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.get("/removebanner", async (req, res) => {
  try {
    await BannerEntity.destroy({ where: { id: req.query.bannerId } });
    return res.status(200).json({ code: true, message: "Banner removed" });
  } catch (err) {
    return res
      .status(err.http_code)
      .json({ code: false, message: err.message });
  }
});

router.post(
  "/update-banner",
  upload.single("bannerImage"),
  async (req, res) => {
    try {
      const entity = await BannerEntity.findOne({
        where: { id: req.body.banner_id },
      });

      if (
        entity?.bannerPosition !== "side" &&
        req.body.bannerPosition == "side"
      ) {
        const sideCheck = await BannerEntity.count({
          where: { bannerPosition: req.body.bannerPosition },
        });

        if (sideCheck >= 2) {
          throw new HttpException(
            422,
            "Please remove side banner first then you can add side banner"
          );
        }
      }

      if (req.file) {
        await BannerEntity.update(
          {
            heading: req.body.heading,
            description: req.body.description,
            bannerImage: req.file.filename,
            bannerPosition: req.body.bannerPosition,
          },
          { where: { id: req.body.banner_id } }
        );
        return res.status(200).json({ code: true, message: "Banner updated" });
      } else {
        await BannerEntity.update(
          {
            heading: req.body.heading,
            description: req.body.description,
            bannerPosition: req.body.bannerPosition,
          },
          { where: { id: req.body.banner_id } }
        );
        return res.status(200).json({ code: true, message: "Banner updated" });
      }
    } catch (err) {
      return res
        .status(err.http_code)
        .json({ code: false, message: err.message });
    }
  }
);

module.exports = router;
