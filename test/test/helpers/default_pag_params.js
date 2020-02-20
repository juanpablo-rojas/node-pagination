const nodePagination = require('../../..');

exports.defaultPagParams = request => ({
  page_count: nodePagination.default_limit,
  count: nodePagination.default_limit,
  total_count: 30,
  total_pages: Math.ceil(30 / nodePagination.default_limit),
  previous_page: null,
  current_page: nodePagination.default_page,
  next_page: 2,
  previous_page_url: null,
  next_page_url: `${request.url}?page=2`
});
