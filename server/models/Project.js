const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  client: String,
  expectedIncome: Number,
  actualIncome: Number,
  timeline: String,
  status: String,
  profitability: Number,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 