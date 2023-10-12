const { BrandEntity } = require("../models/index");
const { HttpException } = require("../exception/http.exception");
const { ENTITY_STATUS } = require("../helper/constant");
const { Op } = require("sequelize");
class BrandService {
  async addBrand(payload) {
    try {
      const { name, description, icon } = payload;
      const entity = await BrandEntity.findOne({ where: { name } });
      if (entity) throw new HttpException(422, "Brand already exists");
      return await BrandEntity.create({
        name,
        description,
        icon: icon,
        status: ENTITY_STATUS.ACTIVE,
      });
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }
  async getBrandPublic() {
    try {
      return await BrandEntity.findAll({
        where: { status: ENTITY_STATUS.ACTIVE },
      });
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }
  async getBrand() {
    try {
      return await BrandEntity.findAll({
        where: { status: ENTITY_STATUS.ACTIVE },
      });
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async updateBrand(id, data) {
    try {
      const entity = await BrandEntity.findOne({
        where: { name: data.name, id: { [Op.ne]: id } },
      });
      if (entity) throw new HttpException(422, "Brand already exists");
      return await BrandEntity.update(data, { where: { id } });
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async deleteBrand(id) {
    try {
      const entity = await BrandEntity.count({ where: { id } });
      if (!entity) throw new HttpException(404, "Brand Not Found");
      return await BrandEntity.update(
        { status: ENTITY_STATUS.DELETED },
        { where: { id } }
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error.http_code, error.message);
    }
  }
}

module.exports = new BrandService();
