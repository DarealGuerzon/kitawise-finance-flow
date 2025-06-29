const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: String,
  description: String,
  targetAmount: Number,
  currentAmount: Number,
  deadline: String,
  category: String,
  status: String,
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;