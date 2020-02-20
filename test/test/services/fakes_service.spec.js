const { findAll } = require('../../app/services/fakes');
const { factory } = require('../factory/fake');
const { Fake } = require('../../app/models');

describe('findAll', () => {
  it('returns all the fakes properly', async () => {
    await factory.createMany('fake', 30);
    const fakes = await findAll();
    expect(fakes.length).toBe(30);
    expect(fakes.length).not.toBe(null);
    expect(fakes[0]).toBeInstanceOf(Fake);
  });
});
