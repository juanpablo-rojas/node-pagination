const adapter = require('./adapter');
const config = require('./config');
const logger = require('../logger/index');

const page = options => (options.page === undefined ? config.defaultPage : options.page);
const limit = options => (options.limit === undefined ? config.defaultLimit : options.limit);

const content_pagination = currentAdapter => ({
  page: currentAdapter.paginated_content(),
  count: currentAdapter.count(),
  total_pages: currentAdapter.total_pages(),
  total_count: currentAdapter.total_count(),
  previous_page: currentAdapter.previous_page(),
  current_page: currentAdapter.page,
  next_page: currentAdapter.next_page(),
  previous_page_url: currentAdapter.pageUrl(currentAdapter.previous_page()),
  next_page_url: currentAdapter.pageUrl(currentAdapter.next_page())
});

exports.paginate = (content, req, options) => {
  const currentAdapter = adapter;
  try {
    currentAdapter.createAdapter(content, page(options), limit(options), req);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
  return content_pagination(currentAdapter);
};
