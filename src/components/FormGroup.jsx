import React from 'react';

/**
 * This component is a form-field wrapper to add label and error-message to it.
 *
 * Label is above the child and error-message is under the child.
 *
 * @param {String} props.label The label
 * @param {String} props.errorMessage The error message
 */
export const FormGroup = (props) => {
  const { label, errorMessage, children, className } = props;

  // Combine default classeNames with possible extra prop classNames
  const classNames = `flex flex-column ${className || ''}`;

  return (
    <div className={classNames} data-testid="form-group">
      {label && <div data-testid="form-group-label">{label}</div>}
      <div data-testid="form-group-children">{children}</div>
      <div className="flex flex-row justify-between red" data-testid="form-group-error-message">
        {errorMessage}
      </div>
    </div>
  );
};
