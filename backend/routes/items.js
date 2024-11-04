const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all items
router.get('/', async (req, res) => {
  const items = await pool.query('SELECT * FROM items');
  res.json(items.rows);
});

// Get item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const item = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  res.json(item.rows[0]);
});

// Add new item
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const newItem = await pool.query(
    'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  res.json(newItem.rows[0]);
});

// Update item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedItem = await pool.query(
    'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  res.json(updatedItem.rows[0]);
});

// Delete item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
  res.json({ message: 'Item deleted' });
});

module.exports = router;
