import React from 'react';
import { ReactComponent as masterCardSvg } from 'assets/card-types/mastercard.svg';
import { ReactComponent as visaSvg } from 'assets/card-types/visa.svg';
import { ReactComponent as americanExpressSvg } from 'assets/card-types/americanExpress.svg';

const TYPE_SVG_MAPPING = {
  visa: visaSvg,
  masterCard: masterCardSvg,
  americanExpress: americanExpressSvg
};

/**
 * Component which outputs the svg-icon of the payment-type
 *
 * @param {String} props.type The payment type
 */
export const PaymentIcon = ({ type }) => {
  if (Object.keys(TYPE_SVG_MAPPING).indexOf(type) === -1) {
    // Not supported type
    return <></>;
  }

  const Icon = TYPE_SVG_MAPPING[type];
  return <Icon data-testid="payment-icon" />;
};
