//Controller for incomes
const Income = require('../models/income');
const {NotFound, BadRequest } = require('../helpers/response');
//Expose the create, getById, getAll, and delete methods
exports.create = async (req, res, next) => {
  try {
    const { amount, title } = req.body;
    const newIncome = new Income({ amount, title });
    const savedIncome = await newIncome.save();
    return res.status(201).json(savedIncome);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

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

exports.getAll = async (req, res, next) => {
  try {
    const incomes = await Income.find();
    return res.status(200).json(incomes);
  } catch (err) {
    return next(BadRequest(err.message));
  }
};

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
