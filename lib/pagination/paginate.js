const Adapter = require('./adapter');
const config = require('./config');
const logger = require('../logger/index');

const page = options => (options.page === undefined ? config.default_page : options.page);
const limit = options => (options.limit === undefined ? config.default_limit : options.limit);

let adapter = undefined;

const content_pagination = () => ({
  page: adapter.paginated_content(),
  count: adapter.count(),
  total_pages: adapter.total_pages(),
  total_count: adapter.total_count(),
  previous_page: adapter.previous_page(),
  current_page: adapter.page,
  next_page: adapter.next_page(),
  previous_page_url: adapter.pageUrl(adapter.previous_page()),
  next_page_url: adapter.pageUrl(adapter.next_page())
});

exports.paginate = (content, req, options) => {
  try {
    adapter = new Adapter(content, page(options), limit(options), req);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
  return content_pagination();
};
