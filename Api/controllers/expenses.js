//Expense controller
const Expense = require('../models/expense');
const { NotFound, BadRequest } = require('../helpers/response');

// Create a new expense entry
exports.create = async (req, res, next) => {
  try {
    const { amount, title, date } = req.body;
    const newExpense = new Expense({ amount, title, date });
    const savedExpense = await newExpense.save();
    return res.status(201).json(savedExpense);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

// Get expense by ID
exports.getById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return next(NotFound());
    }
    return res.status(200).json(expense);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

// Get all expenses
exports.getAll = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    return res.status(200).json(expenses);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

// Update expense by ID
exports.update = async (req, res, next) => {
  try {
    const updatedData = req.body;
    const expense = await Expense.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!expense) {
      return next(NotFound());
    }
    return res.status(200).json(expense);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

// Delete expense by ID
exports.delete = async (req, res, next) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return next(NotFound());
        }
        return res.status(200).json(expense);
    } catch (err) {
        return next(BadRequest(err.message));
    }
};
