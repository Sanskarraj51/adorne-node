const categoryService = require('../service/category.service')
const categoryValidate = require('../joi/category/add')
const { ENTITY_TYPE } = require('../helper/constant')
const { InvalidAuthException } = require('../exception/http.exception')
class CategoryController {
    async addCategory ( req, res )  {
        try{
            if(req.userInfo.role != ENTITY_TYPE.ADMIN) throw new InvalidAuthException
            await categoryValidate(req.body)
            const data = await categoryService.addCategory(req.body)
            return res.status(200).json({ code : true , message: "Category Saved", data})
        }catch(error){
            console.log(error)
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }

    async getCategory ( req, res )  {
        try{
            if(req.userInfo.role != ENTITY_TYPE.ADMIN) throw new InvalidAuthException
            const data = await categoryService.getCategory()
            return res.status(200).json({ code : true , message: "Category Fetched", data})
        }catch(error){
            console.log(error)
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }
    async getCategorypublic ( req, res )  {
        try{
            const data = await categoryService.getCategoryPublic()
            return res.status(200).json({ code : true , message: "Category Fetched", data})
        }catch(error){
            console.log(error)
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }
    async updateCategory ( req, res )  {
        try{
            if(req.userInfo.role != ENTITY_TYPE.ADMIN) throw new InvalidAuthException
            const data = await categoryService.updateCategory( req.params.id, req.body )
            return res.status(200).json({ code : true , message: "Category Updated", data})
        }catch(error){
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }

    async deleteCategory ( req, res )  {
        try{
            if(req.userInfo.role != ENTITY_TYPE.ADMIN) throw new InvalidAuthException
            const data = await categoryService.deleteCategory( req.params.id)
            return res.status(200).json({ code : true , message: "Category Deleted", data})
        }catch(error){
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }
}

module.exports = new CategoryController()