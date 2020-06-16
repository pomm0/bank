import { Response } from 'miragejs';

export const setupRoutes = (server) => {
  // Account routes
  server.get('/account', (schema) => {
    return schema.accounts.first();
  });

  // Balance routes
  server.get('/balance', (schema) => {
    return schema.balances.first();
  });

  // Card routes
  server.get('/cards', (schema) => {
    return schema.cards.all();
  });

  server.put('/cards/:id/activate', (schema, { params: { id } }) => {
    const card = schema.cards.find(id);
    card.update('active', true);

    return new Response(204);
  });

  server.put('/cards/:id/activate', (schema, { params: { id } }) => {
    const card = schema.cards.find(id);
    card.update('active', true);

    return new Response(204);
  });

  // Transaction routes
  server.get('/last-transactions', (schema) => {
    let allTransactions = schema.transactions.all();
    // Sort by newest first
    allTransactions = allTransactions.sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1;
    });

    return allTransactions.slice(0, 10);
  });

  server.post('/transactions', (schema, { requestBody }) => {
    const model = schema.transactions.create(requestBody);

    model.update({
      createdAt: new Date(),
      isReceiving: false
    });

    // TODO: Change serializer to singularize rootKey
    return { transaction: model.toJSON() };
  });

  server.get('/transactions/:id', (schema, { params: { id } }) => {
    const model = schema.transactions.find(id);

    if (!model) {
      return new Response(404);
    }

    // TODO: Change serializer to singularize rootKey
    return { transaction: model.toJSON() };
  });

  server.get('/transactions', (schema) => {
    let allTransactions = schema.transactions.all();

    // Sort by newest first
    allTransactions = allTransactions.sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1;
    });

    return allTransactions;
  });
};
