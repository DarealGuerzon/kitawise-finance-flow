const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: String, // or Date if you want to use JS Date objects
  category: String,
  type: String, // "project" or "personal"
  project: String, // optional, for project expenses
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;