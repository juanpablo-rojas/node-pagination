const { invalidPageNumberError, invalidLimitNumberError } = require('./errors');

let adapterParams = {};

const setAdapterParams = params => {
  adapterParams = { ...params };
};

const minOffset = () => (adapterParams.page === 1 ? 0 : (adapterParams.page - 1) * adapterParams.limit);

const maxOffset = () => minOffset() + adapterParams.limit;

const paginatedContent = () => adapterParams.content.slice(minOffset(), maxOffset());

const count = () => paginatedContent().length;

const totalCount = () => adapterParams.content.length;

const previousPage = () => (adapterParams.page === 1 ? null : adapterParams.page - 1);

const totalPages = () => Math.ceil(totalCount() / adapterParams.limit);

const nextPage = () => (adapterParams.page >= totalPages() ? null : adapterParams.page + 1);

const pageUrl = pageParam =>
  pageParam
    ? `http://${adapterParams.request.headers.host}${adapterParams.request.url}?page=${pageParam}`
    : null;

const contentPagination = () => ({
  page: paginatedContent(),
  count: count(),
  total_pages: totalPages(),
  total_count: totalCount(),
  previous_page: previousPage(),
  current_page: adapterParams.page,
  next_page: nextPage(),
  previous_page_url: pageUrl(previousPage()),
  next_page_url: pageUrl(nextPage())
});

const responseFormat = params => {
  setAdapterParams(params);
  if (typeof adapterParams.page !== 'number' || adapterParams.page <= 0) throw invalidPageNumberError();
  if (typeof adapterParams.limit !== 'number' || adapterParams.limit <= 0) throw invalidLimitNumberError();
  return contentPagination();
};

module.exports = {
  paginatedContent,
  count,
  totalCount,
  previousPage,
  totalPages,
  nextPage,
  pageUrl,
  responseFormat
};
