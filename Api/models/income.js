//Income model
const mongoose = require('mongoose');
//Income schema with amount and title fields
const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Income = mongoose.model('Income', incomeSchema);
//export the Income model
module.exports = Income;
