import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import { Main as MainLayout } from 'components/layout/Main';
import { Routes } from 'routes';
import { BrowserRouter } from 'react-router-dom';
import setupMirage from 'mirage';
import { setLocale } from 'yup';
import yupTranslations from 'translations/de/yup';

setupMirage();

setLocale(yupTranslations);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout>
        <Routes />
      </MainLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
