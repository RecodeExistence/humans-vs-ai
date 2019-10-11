const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get items
router.get('/', async (req, res) => {
    const item = await loadItemCollection();
    res.send(await item.find({}).toArray());
});

// Add item
router.post('/', async (req, res) => {
    const item = await loadItemCollection();
    await item.insertOne({
        text : req.body.text,
        createdAt : new Date()
    });
    res.status(201).send();
});

async function loadItemCollection() {
    const client = await mongodb.MongoClient.connect(
        process.env.mongoURI,{ 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    return client.db('test').collection('items');
}
module.exports = router;