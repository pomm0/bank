import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BankTransferNew, BankTransferList, BankTransferShow } from 'routes/index';

export const BankTransfer = () => {
  return (
    <Routes>
      <Route path="/" element={<BankTransferList />} />
      <Route path="/new" element={<BankTransferNew />} />
      <Route path="/:id" element={<BankTransferShow />} />
    </Routes>
  );
};
