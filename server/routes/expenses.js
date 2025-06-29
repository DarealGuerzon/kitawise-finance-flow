const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Add a new expense
router.post('/', async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.status(201).json(newExpense);
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Edit (update) an expense
router.put('/:id', async (req, res) => {
  const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedExpense) return res.status(404).json({ error: 'Expense not found' });
  res.json(updatedExpense);
});

module.exports = router;