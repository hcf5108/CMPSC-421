const express = require('express');
const router = express.Router();
const Item = require('../models/item');

/**
 * @swagger
 * components:
 *   schemas:
 *     items:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The item's name
 *        description:
 *          type: string
 *          description: Descritpion of item
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref.'#/components/schemas/items'
 *     responses:
 *       201:
 *         description: Item created
 */

// Create a new item
router.post('/', async (req, res) => {
  try {
    console.log("Start waiting...");
    setTimeout(() => {console.log("Waited 1 second!");}, 1000);
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: retrieves a list of items
 *     responses:
 *       200:
 *         description: A list of items
 */

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /items:
 *   patch:
 *     summary: Update item
 *     responses:
 *       200:
 *         description: Update item
 */

// Update an item
router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /items:
 *   delete:
 *     summary: Delete an item
 *     responses:
 *       200:
 *         description: Delete item
 */

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;