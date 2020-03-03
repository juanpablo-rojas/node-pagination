const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.INVALID_PAGE_NUMBER = 'invalid_page_number';
exports.invalidPageNumber = message => internalError(message, exports.INVALID_PAGE_NUMBER);

exports.INVALID_LIMIT_NUMBER = 'invalid_limit_number';
exports.invalidLimitNumber = message => internalError(message, exports.INVALID_LIMIT_NUMBER);
