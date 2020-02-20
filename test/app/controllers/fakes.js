const nodePagination = require('../../..');
const { findAll } = require('../services/fakes');

exports.getFakes = async (req, res, next) => {
  const fakes = await findAll();
  try {
    nodePagination.paginate(fakes, req, res, {});
  } catch (error) {
    next(error);
  }
};

exports.getFakesWithParams = async (req, res, next) => {
  const fakes = await findAll();
  try {
    nodePagination.paginate(fakes, req, res, { limit: 5, page: 3, status: 202 });
  } catch (error) {
    next(error);
  }
};

exports.getFakesWithPageException = async (req, res, next) => {
  const fakes = await findAll();
  try {
    nodePagination.paginate(fakes, req, res, { page: -1 });
  } catch (error) {
    next(error);
  }
};

exports.getFakesWithLimitException = async (req, res, next) => {
  const fakes = await findAll();
  try {
    nodePagination.paginate(fakes, req, res, { limit: -1 });
  } catch (error) {
    next(error);
  }
};
