const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let goals = []; // In-memory storage

// Get all goals
app.get('/api/goals', (req, res) => {
  res.json(goals);
});

// Add a new goal
app.post('/api/goals', (req, res) => {
  const newGoal = { ...req.body, id: Date.now() };
  goals.push(newGoal);
  res.status(201).json(newGoal);
});

// Delete a goal
app.delete('/api/goals/:id', (req, res) => {
  const id = Number(req.params.id);
  goals = goals.filter(goal => goal.id !== id);
  res.status(204).end();
});

// Edit (update) a goal
app.put('/api/goals/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = goals.findIndex(goal => goal.id === id);
  if (index === -1) return res.status(404).json({ error: "Goal not found" });
  goals[index] = { ...goals[index], ...req.body, id };
  res.json(goals[index]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});