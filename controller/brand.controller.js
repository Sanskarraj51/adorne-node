const brandService = require('../service/brand.service')
const categoryValidate = require('../joi/category/add')
const { ENTITY_TYPE } = require('../helper/constant')
const { InvalidAuthException } = require('../exception/http.exception')
class BrandController {
    async addBrand ( req, res )  {
        try{
            if(req.userInfo.role != ENTITY_TYPE.ADMIN) throw new InvalidAuthException
            const data = await brandService.addBrand(req.body)
            return res.status(200).json({ code : true , message: "Brand Saved", data})
        }catch(error){
            console.log(error)
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }

    async getBrand ( req, res )  {
        try{
            if(req.userInfo.role != ENTITY_TYPE.ADMIN) throw new InvalidAuthException
            const data = await brandService.getBrand()
            return res.status(200).json({ code : true , message: "Brand Fetched",
      mediaUrl: process.env.HOST + "/brands/",
            
            data})
        }catch(error){
            console.log(error)
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }
    async getBrandPublic(req,res){
        try{
            const data = await brandService.getBrandPublic()
            return res.status(200).json({ code : true , message: "Brand Fetched", data})
        }catch(error){
            console.log(error)
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }
    async updateBrand ( req, res )  {
        try{
            if(req.userInfo.role != ENTITY_TYPE.ADMIN) throw new InvalidAuthException
            const data = await brandService.updateBrand( req.params.id, req.body )
            return res.status(200).json({ code : true , message: "Brand Updated", data})
        }catch(error){
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }

    async deleteBrand ( req, res )  {
        try{
            if(req.userInfo.role != ENTITY_TYPE.ADMIN) throw new InvalidAuthException
            const data = await brandService.deleteBrand( req.params.id)
            return res.status(200).json({ code : true , message: "Brand Deleted", data})
        }catch(error){
            return res.status(error.http_code).json({ code: false , message : error.message})
        }
    }
}

module.exports = new BrandController()