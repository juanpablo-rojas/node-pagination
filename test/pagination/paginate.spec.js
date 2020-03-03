const request = require('supertest');
const { defaultPagParams } = require('../helpers/default_pag_params');
const { createServer } = require('../server');
const { customPagParams } = require('../helpers/custom_pag_params');
const factory = require('../factory/fake_model');
const { INVALID_PAGE_NUMBER, INVALID_LIMIT_NUMBER } = require('../../lib/pagination/errors');

const testUrls = {
  index: '/index',
  indexWithParams: '/index_with_params',
  indexPageException: '/index_page_exception',
  indexLimitException: '/index_limit_exception'
};
const makeRequest = (url, content, method = 'get') => request(createServer(content))[method](url);

describe('Request default pagination without options passed', () => {
  it('responds with proper pagination params', async () => {
    const fakeModels = factory.fakeModels(30);
    const response = await makeRequest(testUrls.index, fakeModels);
    const responseBody = response.body;
    const pagParams = defaultPagParams(response.request);
    expect(response.statusCode).toBe(200);
    expect(responseBody.page.length).toBe(pagParams.page_count);
    expect(responseBody.count).toBe(pagParams.count);
    expect(responseBody.total_count).toBe(pagParams.total_count);
    expect(responseBody.total_pages).toBe(pagParams.total_pages);
    expect(responseBody.previous_page).toBe(pagParams.previous_page);
    expect(responseBody.next_page).toBe(pagParams.next_page);
    expect(responseBody.previous_page_url).toBe(pagParams.previous_page_url);
    expect(responseBody.next_page_url).toBe(pagParams.next_page_url);
  });

  it('responds with a valid page', async () => {
    const fakeModels = factory.fakeModels(30);
    const expectedList = fakeModels.slice(0, 25);
    const response = await makeRequest(testUrls.index, fakeModels);
    const responsePage = response.body.page;
    expect(responsePage).toStrictEqual(expectedList);
  });
});

describe('Request custom pagination with options passed', () => {
  it('responds with proper pagination params based on the options passed to paginate method', async () => {
    const fakeModels = factory.fakeModels(30);
    const response = await makeRequest(testUrls.indexWithParams, fakeModels);
    const responseBody = response.body;
    const pagParams = customPagParams(response.request);
    expect(response.statusCode).toBe(200);
    expect(responseBody.page.length).toBe(pagParams.page_count);
    expect(responseBody.count).toBe(pagParams.count);
    expect(responseBody.total_count).toBe(pagParams.total_count);
    expect(responseBody.total_pages).toBe(pagParams.total_pages);
    expect(responseBody.previous_page).toBe(pagParams.previous_page);
    expect(responseBody.next_page).toBe(pagParams.next_page);
    expect(responseBody.previous_page_url).toBe(pagParams.previous_page_url);
    expect(responseBody.next_page_url).toBe(pagParams.next_page_url);
  });

  it('responds with a valid page', async () => {
    const fakeModels = factory.fakeModels(30);
    const expectedList = fakeModels.slice(10, 15);
    const response = await makeRequest(testUrls.indexWithParams, fakeModels);
    const responsePage = response.body.page;
    expect(responsePage).toStrictEqual(expectedList);
  });
});

describe('Request pagination with negative page param', () => {
  it('responds with an error when an invalid page is sent in options to paginate method', async () => {
    const response = await makeRequest(testUrls.indexPageException);
    expect(response.body.internalCode).toBe(INVALID_PAGE_NUMBER);
    expect(response.statusCode).toBe(500);
  });
});

describe('Request pagination with negative limit param', () => {
  it('responds with an error when invalid limit is sent in options', async () => {
    const response = await makeRequest(testUrls.indexLimitException);
    expect(response.body.internalCode).toBe(INVALID_LIMIT_NUMBER);
    expect(response.statusCode).toBe(500);
  });
});
