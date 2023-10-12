const express = require('express');
const router = express.Router();
const { ColorsEntity } = require('../models')
const colors = require('../colors.json')
router.post('/', async ( req , res )=>{
    try{
        for(const item of colors){
            const entity = await ColorsEntity.findOne({ where : { name : item['name'] , code : item['hex']} , raw : true })
            if(entity) continue

            await ColorsEntity.create({ name : item['name'] , code : item['hex'] })
            
        }

        return res.status(200).json({ code : true , message: "Colors added"})


    }catch(error){
        return res.status(error.http_code).json({ code: false , message : error.message})
    }
});
router.get('/get-colors', async ( req , res )=>{
    try{
        const colors = await ColorsEntity.findAll({ })
        return res.status(200).json({ code : true , message: "Colors added" , data : colors})
    }catch(err){
        return res.status(error.http_code).json({ code: false , message : err.message})
    }
});

router.post('/update-color', async(req, res) => {
    try{
        const entity = await ColorsEntity.findOne({ where : { name : req.body.name , code : req.body.hex } , raw : true })
        if(entity) {
            return res.status(200).json({ code  : true, message : "Already exists" });
        }

        await ColorsEntity.update({ name : req.body.name , code : req.body.hex }, { where : { id : req.body.color_id } });

        return res.status(200).json({ code : true , message: "Colors updated"})

    }catch(err) {
        return res.status(error.http_code).json({ code: false , message : err.message});
    }
});

router.get('/remove', async(req, res) => {
    try {
        await ColorsEntity.destroy({ where : { id : req.query.color_id } });

        return res.status(200).json({ code : true , message: "Colors removed from list"})
    }catch(err) {
        return res.status(error.http_code).json({ code: false , message : err.message});
    }
});

module.exports = router;