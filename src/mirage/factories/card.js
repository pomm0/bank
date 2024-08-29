import { Factory } from 'miragejs';
import { faker }  from '@faker-js/faker';

const NUMBERS_PER_TYPE = {
  visa: ['4111111111111111', '4012888888881881', '4222222222222'],
  masterCard: ['2221000000000009', '2223000048400011', '2223016768739313'],
  americanExpress: ['378282246310005', '371449635398431']
};

export default Factory.extend({
  type: () => faker.helpers.arrayElement(['visa', 'masterCard', 'americanExpress']),
  active: () => faker.helpers.arrayElement([true, false]),
  createdAt: () => faker.date.past(),

  afterCreate(model) {
    model.update({
      number: faker.helpers.arrayElement(NUMBERS_PER_TYPE[model.type])
    });
  }
});
