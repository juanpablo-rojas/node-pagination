const request = require('supertest')(require('../../app'));
const { factory } = require('../factory/fake');
const { defaultPagParams } = require('../helpers/default_pag_params');
const { customPagParams } = require('../helpers/custom_pag_params');
const { Fake } = require('../../app/models');
const { INVALID_PAGE_NUMBER, INVALID_LIMIT_NUMBER } = require('../../../lib/pagination/errors');

describe('GET /getFakes', () => {
  it('responds with proper pagination params', async () => {
    await factory.createMany('fake', 30);
    const response = await request.get('/fakes');
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
    await factory.createMany('fake', 30);
    const fakes = await Fake.findAll({ limit: 25 });
    const expectedList = JSON.parse(JSON.stringify(fakes, ['id', 'name', 'age']));
    const response = await request.get('/fakes');
    const responsePage = response.body.page;
    expect(responsePage).toStrictEqual(expectedList);
  });
});

describe('GET /getFakesWithParams', () => {
  it('responds with proper pagination params based on the options passed to paginate method', async () => {
    await factory.createMany('fake', 30);
    const response = await request.get('/fakes_with_params');
    const responseBody = response.body;
    const pagParams = customPagParams(response.request);
    expect(responseBody.page.length).toBe(pagParams.page_count);
    expect(responseBody.count).toBe(pagParams.count);
    expect(responseBody.total_count).toBe(pagParams.total_count);
    expect(responseBody.total_pages).toBe(pagParams.total_pages);
    expect(responseBody.previous_page).toBe(pagParams.previous_page);
    expect(responseBody.next_page).toBe(pagParams.next_page);
    expect(responseBody.previous_page_url).toBe(pagParams.previous_page_url);
    expect(responseBody.next_page_url).toBe(pagParams.next_page_url);
  });

  it('responds with the custom statusCode passed in options and with a valid page', async () => {
    await factory.createMany('fake', 30);
    const fakes = await Fake.findAll({ offset: 10, limit: 5 });
    const expectedList = JSON.parse(JSON.stringify(fakes, ['id', 'name', 'age']));
    const response = await request.get('/fakes_with_params');
    const responsePage = response.body.page;
    expect(response.statusCode).toBe(202);
    expect(responsePage).toStrictEqual(expectedList);
  });
});

describe('GET /getFakesWithPageException', () => {
  it('responds with an error status code when invalid page is sent in options', async () => {
    await factory.createMany('fake', 30);
    const response = await request.get('/fakes_page_exception');
    expect(response.body.internal_code).toBe(INVALID_PAGE_NUMBER);
    expect(response.statusCode).toBe(500);
  });
});

describe('GET /getFakesWithLimitException', () => {
  it('responds with an error status code when invalid page is sent in options', async () => {
    await factory.createMany('fake', 30);
    const response = await request.get('/fakes_limit_exception');
    expect(response.body.internal_code).toBe(INVALID_LIMIT_NUMBER);
    expect(response.statusCode).toBe(500);
  });
});
