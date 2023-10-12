const {
  ProductEntity,
  ProductImageEntity,
  CategoryEntity,
  BrandEntity,
  ProductvariantEntity,
  ProductselectedEntity,
  SizeEntity,
  ColorsEntity,
  RatingEntity,
} = require("../models/index");
const { HttpException } = require("../exception/http.exception");
const { ENTITY_STATUS } = require("../helper/constant");
const { Op } = require("sequelize");
const { Sequelize, DataTypes } = require("sequelize");

class ProductService {
  async addProduct(payload) {
    try {
      const data = await ProductEntity.create({
        ...payload,
        status: ENTITY_STATUS.ACTIVE,
      });
      return data;
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async getProduct() {
    try {
      const product = await ProductEntity.findAll({
        include: [
          { model: CategoryEntity },
          { model: BrandEntity },
          { model: ProductImageEntity },
        ],
      });
      console.log(product);
      return product;
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }
  async getProductPublic() {
    try {
      const product = await ProductEntity.findAll({
        where: { status: "active" },
        include: [
          { model: CategoryEntity },
          { model: BrandEntity },
          { model: ProductImageEntity },
          { model: ProductvariantEntity },
        ],
      });
      console.log(product);
      return product;
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async getProductDetailPublic(payload) {
    try {
      const product = await ProductEntity.findOne({
        where: { status: "active", id: payload },
        include: [
          { model: CategoryEntity },
          { model: BrandEntity },
          { model: ProductImageEntity },
          // {
          //   model: ProductvariantEntity,

          //   include: [{ model: SizeEntity }, { model: ColorsEntity }],
          // },
          // {
          //   model : RatingEntity,
          //   // attributes : [
          //   //     [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
          //   //     [Sequelize.fn('COUNT', Sequelize.col('rating')), 'numberOfRatings'],
          //   // ]
          // }
        ],
        group: ["ProductEntity.id"],
      });
      console.log("productproduct----------------------", product);
      return product;
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async updateProduct(id, payload) {
    try {
      let body = {
        name: payload?.name,
        category_id: payload?.category_id,
        price: payload?.price,
        brand_id: payload?.brand_id,
        shortDescription: payload?.shortDescription,
        sku_id: payload?.sku_id,
        description: payload?.description,
        width: payload?.width,
        height: payload?.height,
        weight: payload?.weight,
        length: payload?.length,
        qty: payload?.qty,
      };
      const data = await ProductEntity.update(body, { where: { id } });
      // await ProductImageEntity.create({product_id: data.id, key : payload.image})
      return data;
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const entity = await ProductEntity.findOne({ where: { id } });
      if (!entity) throw new HttpException(404, "Product Not Found");
      return await ProductEntity.update(
        { status: ENTITY_STATUS.DELETED },
        { where: { id } }
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error.http_code, error.message);
    }
  }

  async deleteImage(id) {
    try {
      const entity = await ProductImageEntity.count({ where: { id } });
      if (!entity) throw new HttpException(404, "Image Not Found");

      return await ProductImageEntity.destroy({ where: { id: id } });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.http_code, error.message);
    }
  }
}

module.exports = new ProductService();
