import express from 'express';
import to from 'await-to-js';
import Item from '../../models/Item';

const router = express.Router();

// @route   GET api/items
// @desc    Get all Items
// @access  Public
router.get('/', async (req, res) => {
  const [error, items] = await to(Item.find().sort({ date: -1 }));
  if (error) {
    console.error(error);
    return;
  }

  res.json(items);
});

// @route   POST api/items
// @desc    Create an Item
// @access  Public
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newItem = new Item({
    name
  });
  const [error, item] = await to(newItem.save());
  if (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }

  res.json(item);
});

// @route   POST api/items/:id
// @desc    Delete an Item
// @access  Public
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const [error, item] = await to(Item.findById(id));
  if (error) {
    console.error(error);
    res.status(404).json({ success: false });
  }

  const [error2] = await to(item.remove());
  if (error2) {
    console.error(error);
    res.status(500).json({ success: false });
  }

  res.json({ success: true });
});


export default router;
