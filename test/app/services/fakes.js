const { Fake } = require('../models');
const { databaseError } = require('../../../lib/pagination/errors');

exports.findAll = () =>
  Fake.findAll({ attributes: ['id', 'name', 'age'] }).catch(error => {
    throw databaseError(error.message);
  });
