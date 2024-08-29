import React, { useState } from 'react';
import { Intro, FormGroup, Card } from 'components';
import { useFormik } from 'formik';
import { object, number, date, string } from 'yup';
import { backendFetch } from 'utils/backendFetch';
import { useNavigate } from "react-router-dom";

const TODAY = new Date();
TODAY.setUTCHours(0, 0, 0, 0);
const TODAY_DATE_STRING = TODAY.toISOString().split('T')[0];
const YESTERDAY = new Date();
YESTERDAY.setUTCHours(0, 0, 0, 0);
YESTERDAY.setDate(YESTERDAY.getDate() - 1);

export const New = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ isLoading: false, isError: false });

  const formik = useFormik({
    initialValues: {
      amount: '',
      executeAt: TODAY_DATE_STRING,
      reason: '',
      receiver: {
        name: '',
        iban: '',
        bic: ''
      }
    },
    validationSchema: object({
      amount: number().required().positive(),
      // TODO: fix min-date validation of today
      executeAt: date().min(YESTERDAY).required(),
      receiver: object({
        name: string().required(),
        // TODO: real iban validation
        iban: string().required(),
        // TODO: real bic validation
        bic: string().required()
      })
    }),
    onSubmit: async (values) => {
      setState({ isLoading: true, isError: false });

      try {
        const response = await backendFetch({
          urlPath: '/transactions',
          method: 'POST',
          body: values
        });
        if (!response.ok) {
          throw new Error('[NEW] fetch error');
        }

        const json = await response.json();
        if (!json.transaction || !json.transaction.id) {
          throw new Error('[NEW] fetch response error');
        }

        navigate(`/bank-transfer/${json.transaction.id}?state=newSuccess`);
      } catch (error) {
        setState({ isLoading: false, isError: true });
      }
    }
  });

  return (
    <>
      <Intro title="Neue Überweisung" className="mb-2 mt-4" />

      <Card>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup label="Betrag" errorMessage={formik.touched.amount && formik.errors.amount}>
            <input
              name="amount"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.amount}
              className="w-100"
              min="1"
            />
          </FormGroup>

          <FormGroup
            label="Durchführungsdatum"
            className="mt-2"
            errorMessage={formik.touched.executeAt && formik.errors.executeAt}
          >
            <input
              name="executeAt"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.executeAt}
              className="w-100"
              min={TODAY_DATE_STRING}
            />
          </FormGroup>

          <FormGroup label="Grund" className="mt-2">
            <textarea
              name="reason"
              onChange={formik.handleChange}
              value={formik.values.reason}
              className="w-100"
            />
          </FormGroup>

          <FormGroup
            label="Begünstigter"
            className="mt-2"
            errorMessage={
              formik.touched.receiver &&
              formik.touched.receiver.name &&
              formik.errors.receiver &&
              formik.errors.receiver.name
            }
          >
            <input
              name="receiver.name"
              onChange={formik.handleChange}
              value={formik.values.receiver.name}
              className="w-100"
            />
          </FormGroup>

          <FormGroup
            label="Konto des Begünstigten"
            className="mt-2"
            errorMessage={
              formik.touched.receiver &&
              formik.touched.receiver.iban &&
              formik.errors.receiver &&
              formik.errors.receiver.iban
            }
          >
            <input
              name="receiver.iban"
              onChange={formik.handleChange}
              value={formik.values.receiver.iban}
              className="w-100"
            />
          </FormGroup>

          <FormGroup
            label="BIC des Begünstigten"
            className="mt-2"
            errorMessage={
              formik.touched.receiver &&
              formik.touched.receiver.bic &&
              formik.errors.receiver &&
              formik.errors.receiver.bic
            }
          >
            <input
              name="receiver.bic"
              onChange={formik.handleChange}
              value={formik.values.receiver.bic}
              className="w-100"
            />
          </FormGroup>

          <button type="submit" className="mt-4" disabled={state.isLoading}>
            Absenden
          </button>
          {state.isError && <>Es ist ein Fehler aufgetreten!</>}
        </form>
      </Card>
    </>
  );
};
