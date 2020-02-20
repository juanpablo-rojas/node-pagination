const { factory } = require('factory-girl');
const { Fake } = require('../../app/models');

factory.define('fake', Fake, () => ({
  name: factory.chance('first'),
  age: factory.chance('integer', { min: 0, max: 99 })
}));

module.exports = { factory };
