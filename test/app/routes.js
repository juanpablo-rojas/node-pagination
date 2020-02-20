const {
  getFakes,
  getFakesWithParams,
  getFakesWithPageException,
  getFakesWithLimitException
} = require('./controllers/fakes');

exports.init = app => {
  app.get('/fakes', getFakes);
  app.get('/fakes_with_params', getFakesWithParams);
  app.get('/fakes_page_exception', getFakesWithPageException);
  app.get('/fakes_limit_exception', getFakesWithLimitException);
};
