import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  id: () => faker.finance.accountNumber(),
  bc: () => faker.string.numeric(),
  iban: () => faker.finance.iban(),
  bic: () => faker.finance.bic(),
  name: () => faker.finance.accountName()
});
