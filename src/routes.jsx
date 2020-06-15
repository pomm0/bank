import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BankTransfer, Card, Dashboard } from 'routes/index';

export const Routes = () => (
  <Switch>
    <Route path="/bank-transfer" component={BankTransfer} />
    <Route path="/card" component={Card} />
    <Route path="/" component={Dashboard} />
  </Switch>
);
