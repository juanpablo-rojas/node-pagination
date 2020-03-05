const { invalidPageNumber, invalidLimitNumber } = require('./errors');

exports.content = undefined;
exports.page = undefined;
exports.limit = undefined;
exports.request = undefined;

exports.createAdapter = (content, page, limit, req) => {
  if (typeof page !== 'number' || page <= 0) throw invalidPageNumber('Invalid Page Number');
  if (typeof limit !== 'number' || limit <= 0) throw invalidLimitNumber('Invalid Limit Number');

  exports.content = content;
  exports.page = page;
  exports.limit = limit;
  exports.request = req;
};

exports.count = () => exports.paginated_content().length;

exports.total_count = () => exports.content.length;

exports.previous_page = () => (exports.page === 1 ? null : exports.page - 1);

exports.total_pages = () => Math.ceil(exports.total_count() / exports.limit);

exports.next_page = () => (exports.page >= exports.total_pages() ? null : exports.page + 1);

exports.paginated_content = () => exports.content.slice(exports.minOffset(), exports.maxOffset());

exports.minOffset = () => (exports.page === 1 ? 0 : (exports.page - 1) * exports.limit);

exports.maxOffset = () => exports.minOffset() + exports.limit;

exports.pageUrl = page =>
  page ? `http://${exports.request.headers.host}${exports.request.url}?page=${page}` : null;
