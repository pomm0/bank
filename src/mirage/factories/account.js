import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: () => faker.finance.account(),
  bc: () => faker.random.number(),
  iban: () => faker.finance.iban(),
  bic: () => faker.finance.bic(),
  name: () => faker.finance.accountName()
});
