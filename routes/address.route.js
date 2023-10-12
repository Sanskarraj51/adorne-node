const express = require('express');
const router = express.Router();
const upload = require('../helper/productsUpload')
const { AddressEntity } = require('../models');

router.post('/add', async( req,res)=>{
  
    try{

        let checkAddress = AddressEntity.findOne({ where : { status : 1, user_id : req.body.user_id, isDefault : 1 } });
        let isDefault = 1;
        if(checkAddress) {
            isDefault = 0;
        }
        await AddressEntity.create({  user_id : req.body.user_id, status : 1, address1 : req.body.address1, address2 : req.body.address2, full_name : req.body.full_name, city : req.body.city, state : req.body.state, country : req.body.country, pin : req.body.pin, isDefault : isDefault, email :  req.body.email, address_type : req.body.address_type, phone : req.body.phone });

        return res.status(200).json({ code : true , message: "Address added" })
    }catch(err){
        return res.status(err.http_code).json({ code: false , message : err.message})
    }
});

router.get('/', async( req,res)=>{
  
    try{

        let addresses = await AddressEntity.findAll({ where : { status : 1, user_id : req.query.user_id } });
        return res.status(200).json({ code : true , message: "All address", data :addresses  })
    }catch(err){
        return res.status(err.http_code).json({ code: false , message : err.message})
    }
});

router.post('/update', async(req, res) => {
    try {

        if(req.body.isDefault) {
            await AddressEntity.update({ isDefault : 0 }, { where : { user_id: req.body.user_id, status : 1 } })
        }

        await AddressEntity.update({ user_id : req.body.user_id, status : 1, address1 : req.body.address1, address2 : req.body.address2, full_name : req.body.full_name, city : req.body.city, state : req.body.state, country : req.body.country, pin : req.body.pin, isDefault : req.body.isDefault, email :  req.body.email, address_type : req.body.address_type, phone : req.body.phone  }, {where : { id : req.body.address_id, user_id: req.body.user_id }});

        return res.status(200).json({ code : true , message: "Address updated." })
    }catch(err) {
        return res.status(err.http_code).json({ code: false , message : err.message})
    }
});

router.get('/get-address', async(req, res) => {
    try{
        let addressData = await AddressEntity.findOne({ where : { id : req.query.addres_id } });
        return res.status(200).json({ code : true , message: "Address data.", data : addressData })
    }catch(err) {
        return res.status(err.http_code).json({ code: false , message : err.message})
    }
});

router.get('/remove', async(req, res) => {
    try{
        await AddressEntity.update({ status : 0 }, {where : { id : req.query.address_id }});
        return res.status(200).json({ code : true , message: "Address removed." })
    }catch(err) {
        return res.status(err.http_code).json({ code: false , message : err.message})
    }
});

module.exports = router;