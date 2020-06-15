import { Factory } from 'miragejs';
import faker from 'faker';

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
  reason: () => (faker.random.boolean() ? faker.lorem.words() : null),
  amount: () => parseFloat(faker.finance.amount()),
  isReceiving: () => faker.random.boolean(),
  createdAt: () => faker.date.past()
});
