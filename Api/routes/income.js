//Income routes
const express = require('express');
const controller = require('../controllers/incomes');
const { isAuth } = require('../middlewares/isAuth');
const rbac = require('../middlewares/rbac');
const { validator } = require('../middlewares/validator');

const router = express.Router();
//Get and post on the / route
router.route('/')
  .get(isAuth,rbac('users', 'read:any'), controller.getAll)
  .post(isAuth,rbac('users', 'create:any'),validator('income'), controller.create);
//Get and delete on the /:id route
router.route('/:id')
    .get(isAuth,rbac('users', 'read:any'),controller.getById)
    .delete(isAuth,rbac('users', 'delete:any'),controller.delete);

//Export income router
module.exports = router;