const express = require('express');
const router = express.Router();
// const { ColorsEntity } = require('../models')
const { SizeEntity } = require('../models');
// const colors = require('../colors.json')



router.post('/add-sizes', async ( req , res )=>{
   
    try{

        const entity = await SizeEntity.findOne({ where : { name : req.body.name }})
            if(entity) {
                return res.status(200).json({ code  : true, message : "Already exists" });
            } 

        await SizeEntity.create({ name : req.body.name  })


        return res.status(200).json({ code : true , message: "sizes added"})


    }catch(error){
   
        return res.status(error.http_code).json({ code: false , message : error.message})
    }
});
router.get('/', async ( req , res )=>{
    try{
        const sizes = await SizeEntity.findAll({ })
        return res.status(200).json({ code : true , message: "Sizes list" , data : sizes})
    }catch(err){
        return res.status(err.http_code).json({ code: false , message : err.message})
    }
});

module.exports = router;