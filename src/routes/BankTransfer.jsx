import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BankTransferNew, BankTransferList, BankTransferShow } from 'routes/index';

export const BankTransfer = () => {
  return (
    <Switch>
      <Route exact path="/bank-transfer" component={BankTransferList} />
      <Route exact path="/bank-transfer/new" component={BankTransferNew} />
      <Route exact path="/bank-transfer/:id" component={BankTransferShow} />
    </Switch>
  );
};
