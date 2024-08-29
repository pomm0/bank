import { Server, Model, RestSerializer } from 'miragejs';
import {
  account as accountFactory,
  balance as balanceFactory,
  card as cardFactory,
  transaction as transactionFactory
} from './factories';
import { setupRoutes } from './routes';

export default () =>
  new Server({
    urlPrefix: process.env.REACT_APP_API_URL,

    models: {
      account: Model,
      balance: Model,
      card: Model,
      transactions: Model
    },

    factories: {
      account: accountFactory,
      balance: balanceFactory,
      card: cardFactory,
      transaction: transactionFactory
    },

    serializers: {
      application: RestSerializer
    },

    routes() {
      setupRoutes(this);
    },

    seeds(server) {
      server.create('account');
      server.create('balance');
      server.createList('card', 2);
      // Ensure minimum one card is not active
      server.create('card', { active: false });
      server.createList('transaction', 50);
    }
  });
