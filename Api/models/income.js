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
});

const Income = mongoose.model('Income', incomeSchema);
//export the Income model
module.exports = Income;
