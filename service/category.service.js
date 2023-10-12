const { CategoryEntity  } = require('../models/index')
const { HttpException } = require('../exception/http.exception')
const { ENTITY_STATUS } = require('../helper/constant')
const { Op } = require('sequelize')
class CategoryService {
    async addCategory(payload){
        try{
            const { name , description } = payload
            const entity = await CategoryEntity.findOne({ where : { name }})
            if(entity) throw new HttpException(422, 'Category already exists')
            return await CategoryEntity.create({
                name , 
                description,
                status : ENTITY_STATUS.ACTIVE
            })
        }catch(error){
            throw new HttpException(error.http_code, error.message)
        }
    }

    async getCategory(){
        try{
            return await CategoryEntity.findAll({})
        }catch(error){
            throw new HttpException(error.http_code, error.message)
        }
    }
    async getCategoryPublic(){
        try{
            return await CategoryEntity.findAll({where:{status: "active"}})
        }catch(error){
            throw new HttpException(error.http_code,error.message)
        }
    }
    async updateCategory(id , data ){
        try{
            const entity = await CategoryEntity.findOne({ where : { name : data.name , id : { [Op.ne] : id}}})
            if(entity) throw new HttpException(422, 'Category already exists')
            return await CategoryEntity.update(data , { where  : { id }})
        }catch(error){
            throw new HttpException(error.http_code, error.message)
        }
    }

    async deleteCategory(id ){
        try{
            const entity = await CategoryEntity.count({ where : { id }})
            if(!entity) throw new HttpException(404, 'Category Not Found')
            return await CategoryEntity.update({ status : ENTITY_STATUS.DELETED} , { where  : { id }})
        }catch(error){
            console.log(error)
            throw new HttpException(error.http_code, error.message)
        }
    }
}

module.exports = new CategoryService