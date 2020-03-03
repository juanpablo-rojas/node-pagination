const { invalidPageNumber, invalidLimitNumber } = require('./errors');

module.exports = class Adapter {
  constructor(content, page, limit, req) {
    this.content = content;
    this.page = page;
    this.limit = limit;
    this.request = req;
    if (typeof this.page !== 'number' || this.page <= 0) throw invalidPageNumber('Invalid Page Number');
    if (typeof this.limit !== 'number' || this.limit <= 0) throw invalidLimitNumber('Invalid Limit Number');
  }

  count() {
    return this.paginated_content().length;
  }

  total_count() {
    return this.content.length;
  }

  previous_page() {
    return this.page === 1 ? null : this.page - 1;
  }

  total_pages() {
    return Math.ceil(this.total_count() / this.limit);
  }

  next_page() {
    return this.page >= this.total_pages() ? null : this.page + 1;
  }

  paginated_content() {
    return this.content.slice(this.minOffset(), this.maxOffset());
  }

  minOffset() {
    return this.page === 1 ? 0 : (this.page - 1) * this.limit;
  }

  maxOffset() {
    return this.minOffset() + this.limit;
  }

  pageUrl(page) {
    return page ? `http://${this.request.headers.host}${this.request.url}?page=${page}` : null;
  }
};
