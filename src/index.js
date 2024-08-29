import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/app.scss';
import { Main as MainLayout } from 'components/layout/Main';
import { Routes } from 'routes';
import { BrowserRouter } from 'react-router-dom';
import setupMirage from 'mirage';
import { setLocale } from 'yup';
import yupTranslations from 'translations/de/yup';

setupMirage();

setLocale(yupTranslations);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout>
        <Routes />
      </MainLayout>
    </BrowserRouter>
  </React.StrictMode>
);
