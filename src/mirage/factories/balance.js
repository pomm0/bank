import { Factory } from "miragejs"
import faker from 'faker';

export default Factory.extend({
  amount: () => faker.finance.amount(),
});
