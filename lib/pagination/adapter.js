const { invalidPageNumber, invalidLimitNumber } = require('./errors');

let content = undefined;
let page = undefined;
let limit = undefined;
let request = undefined;

const createAdapter = (data, currentPage, limitParam, req) => {
  if (typeof currentPage !== 'number' || currentPage <= 0) throw invalidPageNumber('Invalid Page Number');
  if (typeof limitParam !== 'number' || limitParam <= 0) throw invalidLimitNumber('Invalid Limit Number');

  content = data;
  page = currentPage;
  limit = limitParam;
  request = req;
};

const minOffset = () => (page === 1 ? 0 : (page - 1) * limit);

const maxOffset = () => minOffset() + limit;

const paginated_content = () => content.slice(minOffset(), maxOffset());

const count = () => paginated_content().length;

const total_count = () => content.length;

const previous_page = () => (page === 1 ? null : page - 1);

const total_pages = () => Math.ceil(total_count() / limit);

const next_page = () => (page >= total_pages() ? null : page + 1);

const pageUrl = pageParam =>
  pageParam ? `http://${request.headers.host}${request.url}?page=${pageParam}` : null;

module.exports = {
  createAdapter,
  paginated_content,
  count,
  total_count,
  previous_page,
  total_pages,
  next_page,
  pageUrl,
  content: undefined,
  page: undefined,
  limit: undefined,
  request: undefined
};
