import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  receiver: () => {
    return {
      name: faker.finance.accountName(),
      iban: faker.finance.iban(),
      bic: faker.finance.bic()
    };
  },
  sender: () => {
    return {
      name: faker.finance.accountName(),
      iban: faker.finance.iban(),
      bic: faker.finance.bic()
    };
  },
  reason: () => (faker.helpers.arrayElement([true, false]) ? faker.lorem.words() : null),
  amount: () => parseFloat(faker.finance.amount()),
  isReceiving: () => faker.helpers.arrayElement([true, false]),
  createdAt: () => faker.date.past()
});
