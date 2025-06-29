const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Get all goals
router.get('/', async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});

// Add a new goal
router.post('/', async (req, res) => {
  try {
    const goalData = { ...req.body };
    delete goalData._id; // Ensure no _id is sent
    const newGoal = new Goal(goalData);
    await newGoal.save();
    const savedGoal = await Goal.findById(newGoal._id);
    res.status(201).json(savedGoal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  await Goal.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Edit (update) a goal
router.put('/:id', async (req, res) => {
  await Goal.findByIdAndUpdate(req.params.id, req.body);
  // Fetch the updated goal to ensure it matches GET
  const updatedGoal = await Goal.findById(req.params.id);
  if (!updatedGoal) return res.status(404).json({ error: "Goal not found" });
  res.json(updatedGoal);
});

module.exports = router;