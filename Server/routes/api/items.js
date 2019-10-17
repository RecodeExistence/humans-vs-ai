const express = require('express');
const mongodb = require('mongodb');
const { check, validationResult } = require("express-validator/check");

const User = require('../../models/Users');

const router = express.Router();
const auth = require('../../middleware/auth');

// Get items
router.get('/', async (req, res) => {
    const item = await loadItemCollection();
    res.send(await item.find({}).toArray());
});

// Add item
router.post('/', auth, [
    check('name', 'Item name is required')
        .not()
        .isEmpty()
        .,
    check('price', "Please include a price")
        .not()
        .isEmpty()
    ], 
    
    async (req, res) => {
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

    const item = await loadItemCollection();
    await item.insertOne({
        text : req.body.text,
        createdAt : new Date()
    });
    res.status(201).send();
});

module.exports = router;