import React from 'react';
import { Routes as UpstreamRoutes, Route } from 'react-router-dom';
import { BankTransfer, Card, Dashboard } from 'routes/index';

export const Routes = () => (
  <UpstreamRoutes>
    <Route path="/bank-transfer/*" element={<BankTransfer />} />
    <Route path="/card" element={<Card />} />
    <Route path="/" element={<Dashboard />} />
  </UpstreamRoutes>
);
