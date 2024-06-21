const Income = require('../models/income');
const { NotFound, BadRequest } = require('../helpers/response');

// Create a new income entry
exports.create = async (req, res, next) => {
  try {
    const { amount, title, date } = req.body;
    const newIncome = new Income({ amount, title, date });
    const savedIncome = await newIncome.save();
    return res.status(201).json(savedIncome);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

// Get income by ID
exports.getById = async (req, res, next) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return next(NotFound());
    }
    return res.status(200).json(income);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

// Get all incomes
exports.getAll = async (req, res, next) => {
  try {
    const incomes = await Income.find();
    return res.status(200).json(incomes);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

// Update income by ID
exports.update = async (req, res, next) => {
  try {
    const updatedData = req.body;
    const income = await Income.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!income) {
      return next(NotFound());
    }
    return res.status(200).json(income);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

// Delete income by ID
exports.delete = async (req, res, next) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return next(NotFound());
    }
    return res.status(204).json({ message: 'Income deleted successfully' });
  } catch (err) {
    return next(BadRequest(err.message));
  }
};
