const express = require('express');
const router = express.Router();
const { SubscriberEntity } = require("../models");

// Subscribe to the newsletter
router.post('/add-subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    let checkSubscriber = await SubscriberEntity.findOne({ email : email, status : 1 });
    if(checkSubscriber) {
      return res.status(200).json({ code: true, message: "Already exists" });

    }
    const subscriber = await SubscriberEntity.create({ email });
    
    res.status(201).json({ code : true , message: 'Subscriber added successfully' });
  } catch (error) {
    res.status(400).json({code: false , error: error.message });
  }
});

// List all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await SubscriberEntity.findAll({ where : {status : 1} });
    res.json( {code : true , message : "All Subscribe", data : subscribers});
  } catch (error) {
    res.status(500).json({code: false , error: error.message });
  }
});

// Unsubscribe from the newsletter
router.get('/unsubscribe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let checkSubscriber = await SubscriberEntity.findOne({ where : { id : id } });
    if (!checkSubscriber) {
        return res.status(404).json({code: false , message: 'Subscriber not found' });
    }

    if(checkSubscriber) {
        await SubscriberEntity.update({ status : 0 }, { where : { id : id } });
    }


    res.json({ code : true , message: 'Subscriber unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({code: false , error: error.message });
  }
});

module.exports = router;