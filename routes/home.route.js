const express = require("express");
const router = express.Router();
const {
  ProductEntity,
  ProductImageEntity,
  ProductvariantEntity,
  CategoryEntity,
  BrandEntity,
  BannerEntity,
  BlogEntity,
  ColorsEntity,
  SizeEntity,
  RatingEntity,
} = require("../models");
const { Sequelize, DataTypes } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    let banners = await BannerEntity.findAll({ where: { status: 1 } });

    let blogs = await BlogEntity.findAll({
      where: { status: 1 },
      limit: 3,
      order: [["id", "DESC"]],
    });

    let popularItem = await ProductEntity.findAll({
      where: { status: "active" },
      limit: 4,
      // order : [[ "id", "DESC" ]],
      order: Sequelize.literal("rand()"),
      include: [
        {
          model: CategoryEntity,
          required: false,
        },
        {
          model: BrandEntity,
          required: false,
        },
        {
          model: ProductImageEntity,
          required: false,
        },
        {
          model: ProductvariantEntity,
          include: [
            {
              model: SizeEntity,
              required: false,
            },
            {
              model: ColorsEntity,
              required: false,
            },
          ],
          required: false,
        },
        {
          model: RatingEntity,

          // attributes : [
          //     [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
          //     [Sequelize.fn('COUNT', Sequelize.col('rating')), 'numberOfRatings'],
          // ],
          required: false,
        },
      ],
      group: ["ProductEntity.id"],
    });

    let topSellingProductData = await ProductEntity.findAll({
      where: { status: "active" },
      limit: 4,
      // order : [[ "id", "DESC" ]],
      order: Sequelize.literal("rand()"),
      include: [
        {
          model: CategoryEntity,
          required: false,
        },
        {
          model: BrandEntity,
          required: false,
        },
        {
          model: ProductImageEntity,
          required: false,
        },
        {
          model: ProductvariantEntity,
          include: [
            {
              model: SizeEntity,
              required: false,
            },
            {
              model: ColorsEntity,
              required: false,
            },
          ],
          required: false,
        },
        {
          model: RatingEntity,

          // attributes : [
          //     [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
          //     [Sequelize.fn('COUNT', Sequelize.col('rating')), 'numberOfRatings'],
          // ],
          required: false,
        },
      ],
      group: ["ProductEntity.id"],
    });

    let newArrivalsData = await ProductEntity.findAll({
      where: { status: "active" },
      limit: 4,
      // order : [[ "id", "DESC" ]],
      order: Sequelize.literal("rand()"),
      include: [
        {
          model: CategoryEntity,
          required: false,
        },
        {
          model: BrandEntity,
          required: false,
        },
        {
          model: ProductImageEntity,
          required: false,
        },
        {
          model: ProductvariantEntity,
          include: [
            {
              model: SizeEntity,
              required: false,
            },
            {
              model: ColorsEntity,
              required: false,
            },
          ],
          required: false,
        },
        {
          model: RatingEntity,

          // attributes : [
          //     [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
          //     [Sequelize.fn('COUNT', Sequelize.col('rating')), 'numberOfRatings'],
          // ],
          required: false,
        },
      ],
      group: ["ProductEntity.id"],
    });

    let featureProductData = await ProductEntity.findAll({
      where: { status: "active" },
      limit: 4,
      // order : [[ "id", "DESC" ]],
      order: Sequelize.literal("rand()"),
      include: [
        {
          model: CategoryEntity,
          required: false,
        },
        {
          model: BrandEntity,
          required: false,
        },
        {
          model: ProductImageEntity,
          required: false,
        },
        {
          model: ProductvariantEntity,
          include: [
            {
              model: SizeEntity,
              required: false,
            },
            {
              model: ColorsEntity,
              required: false,
            },
          ],
          required: false,
        },
        {
          model: RatingEntity,

          // attributes : [
          //     [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
          //     [Sequelize.fn('COUNT', Sequelize.col('rating')), 'numberOfRatings'],
          // ],
          required: false,
        },
      ],
      group: ["ProductEntity.id"],
    });

    let newArrivals = await ProductEntity.findAll({
      where: { status: "active" },
      limit: 4,
      order: [["id", "DESC"]],
      include: [
        {
          model: CategoryEntity,
          required: false,
        },
        {
          model: BrandEntity,
          required: false,
        },
        {
          model: ProductImageEntity,
          required: false,
        },
        {
          model: ProductvariantEntity,
          required: false,
          include: [
            {
              model: SizeEntity,
              required: false,
            },
            {
              model: ColorsEntity,
              required: false,
            },
          ],
        },
        {
          model: RatingEntity,
          required: false,
          // attributes : [
          //     [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
          //     [Sequelize.fn('COUNT', Sequelize.col('rating')), 'numberOfRatings'],
          // ]
        },
      ],
      group: ["ProductEntity.id"],
    });
    let homePageResponse = {
      mediaUrl: process.env.HOST + "/products/",
      popularItem: popularItem,
      newArrivals: newArrivals,

      featureProduct: featureProductData,
      topSellingProduct: topSellingProductData,
      newestArrival: newArrivalsData,

      banners: banners,
      blogs: blogs,
    };

    return res
      .status(200)
      .json({ code: true, message: "Home page API", data: homePageResponse });
  } catch (error) {
    return res
      .status(error.http_code)
      .json({ code: false, message: error.message });
  }
});

module.exports = router;
