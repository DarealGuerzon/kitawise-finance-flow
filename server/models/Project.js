const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  client: String,
  expectedIncome: Number,
  actualIncome: Number,
  date: Date,
  status: String,
  timeline: String,
  profitability: Number,
  description: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 