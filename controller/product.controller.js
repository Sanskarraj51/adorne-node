const productService = require("../service/product.service");
const categoryValidate = require("../joi/category/add");
const { ENTITY_TYPE } = require("../helper/constant");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {
  ProductEntity,
  ProductImageEntity,
  CategoryEntity,
  BrandEntity,
  ProductselectedEntity,
  ProductvariantEntity,
  ColorsEntity,
  SizeEntity,
  colorsEntity,
  RatingEntity
} = require("../models/index");

const { InvalidAuthException } = require("../exception/http.exception");
// const SizeEntity = require('../models/SizeEntity')
// const colorsEntity = require('../models/colorsEntity')
class ProductController {
  async addProduct(req, res) {
    try {
      if (req.userInfo.role != ENTITY_TYPE.ADMIN)
        throw new InvalidAuthException();
      const data = await productService.addProduct(req.body);
      //const data1 = await ProductEntity.create({...payload, status : ENTITY_STATUS.ACTIVE})
      req.files.forEach(async (element) => {
        await ProductImageEntity.create({
          product_id: data.id,
          key: element.filename,
        });
      });

      return res
        .status(200)
        .json({ code: true, message: "Product Saved", data });
    } catch (error) {
      console.log(error);
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }

  async getProduct(req, res) {
    try {
      if (req.userInfo.role != ENTITY_TYPE.ADMIN)
        throw new InvalidAuthException();
      const data = await productService.getProduct();

      return res
        .status(200)
        .json({ code: true, message: "Product Fetched", data });
    } catch (error) {
      console.log(error);
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }

  async getProductPublic(req, res) {
    try {
      const data = await productService.getProductPublic();
      let respData = {
        mediaUrl: process.env.HOST + "/products/",
        products: data,
      };
      return res
        .status(200)
        .json({ code: true, message: "Product Fetched", respData });
    } catch (error) {
      console.log(error);
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }

  async getProductDetail(req, res) {
    try {
    const data = await productService.getProductDetailPublic(
      req.query.product_id
    );

    const relatedProduct = await ProductEntity.findAll({ 
      where : { status : 'active', category_id : data.category_id }, 
      limit : 4,
      // order : [[ "id", "DESC" ]],
      order: Sequelize.literal('rand()'),
      include:[
          { 
              model: CategoryEntity,
              required : false
          },
          { 
              model: BrandEntity,
              required : false
          },
          { 
              model: ProductImageEntity,
              required : false
          },
          { 
              model: ProductvariantEntity,
              include  : [
                  { 
                      model : SizeEntity,
                      required : false
                   },
                  { 
                      model : ColorsEntity,
                      required : false
                  }
              ]
              ,required : false 
          },
          {
              model : RatingEntity,
              
              // attributes : [
              //     [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
              //     [Sequelize.fn('COUNT', Sequelize.col('rating')), 'numberOfRatings'],
              // ],
              required : false,
             
          }
      ],
      group: ['ProductEntity.id'],
      
  });


    let getProductSelectedAttribute = await ProductselectedEntity.findOne({
      where: { product_id: req.query.product_id },
    });

    let selectedAttributes = {};
    let color = [];
    let size = [];
    if (getProductSelectedAttribute) {
      let sizeAttibute = getProductSelectedAttribute.size;

      if (sizeAttibute) {
        let sArr = sizeAttibute.split(",");
        size = await SizeEntity.findAll({ where: { id: sArr } });
      }

      let colorAttribute = getProductSelectedAttribute.color;

      if (colorAttribute) {
        let cArr = colorAttribute.split(",");
        color = await ColorsEntity.findAll({ where: { id: cArr } });
      }
    }

    let respData = {
      mediaUrl: process.env.HOST + "/products/",
      products: data,
      relatedProduct : relatedProduct,
      productAttribute: {
        color,
        size,
      },
    };
    return res
      .status(200)
      .json({ code: true, message: "Product Fetched", respData });
    }catch(error) {
        return res.status(error.http_code).json({ code: false , message : "Something went wrong."})
    }
  }

  async updateProduct(req, res) {
    try {
      if (req.userInfo.role != ENTITY_TYPE.ADMIN)
        throw new InvalidAuthException();
      if (req?.files?.length) {
        req.files.forEach(async (element) => {
          await ProductImageEntity.create({
            product_id: req.params.id,
            key: element.filename,
          });
        });
      }
      const data = await productService.updateProduct(req.params.id, req.body);
      return res
        .status(200)
        .json({ code: true, message: "Product Updated", data });
    } catch (error) {
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      if (req.userInfo.role != ENTITY_TYPE.ADMIN)
        throw new InvalidAuthException();
      const data = await productService.deleteProduct(req.params.id);
      return res
        .status(200)
        .json({ code: true, message: "Product Deleted", data });
    } catch (error) {
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }
  async deleteImage(req, res) {
    try {
      if (req.userInfo.role != ENTITY_TYPE.ADMIN)
        throw new InvalidAuthException();
      const data = await productService.deleteImage(req.params.id);
      return res
        .status(200)
        .json({ code: true, message: "Image Deleted", data });
    } catch (error) {
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }

  async searchProduct(req, res) {
    try {
      const { query } = req.query;
  
      console.log("Query : ");
      console.log(query);

      if (!query) {
        return res.status(400).json({ message: 'Please provide a search query' });
      }
  
      const products = await ProductEntity.findAll({
        where: {
          'status' : 1,
          [Op.or]: [
            { name: { [Op.like]: `%${query}%` } }, // Case-insensitive name match
            { description: { [Op.like]: `%${query}%` } },
            { shortDescription :  { [Op.like]: `%${query}%` } } // Case-insensitive description match
          ],
        },
        include: [
          { model: CategoryEntity },
          { model: BrandEntity },
          { model: ProductImageEntity },
          { model: ProductvariantEntity },
        ],
        order : [[ 'id', 'DESC' ]]
      });
  
      res.json({code : true, message : "search data",data : products} );
    }catch(err) {
      console.error(err);
      return res.status(500).json({code : false,  error: 'Internal Server Error' });
    }
  }
}

module.exports = new ProductController();