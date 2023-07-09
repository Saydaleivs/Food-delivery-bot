const express = require('express');
const router = express.Router();
const { items } = require('../db');
const { Items } = require('../models/item');

router.get('/items', (req, res) => {
  const category = req.query['category'];
  if (!category) return;
  if (category === 'ALL') {
    res.send(items);
    return;
  }

  const filteredProds = items.filter((item) => item.type === category);
  res.send(filteredProds);
});

router.get('/itemsDB', async (req, res) => {
  const { category, ids } = req.query;
  const items = await Items.find({ id: { $in: ids } });
  res.send(items);
});

// router.get('/getItems', (r))

// router.post('/addItem', (req, res) => {
//   const { item } = req.body;
// });

module.exports = router;
