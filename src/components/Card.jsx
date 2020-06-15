import React from 'react';

/**
 * This internal component represents the header of the card;
 *
 * @param {String} props.title The tile of the card header
 */
const CardHeader = ({ title }) => {
  return (
    <div
      className="bb-1 mb-2 bcolor-grey df flex-row justify-between font-md"
      data-testid="card-header"
    >
      {title}
    </div>
  );
};

/**
 * This component represents a card.
 * A card is a container with white background, shadow and border-radius.
 * It can have a `title` which will be rendered as 'header'.
 *
 * @param {String} props.title The tile of the card header
 * @param {String} props.isLoading Whether in ' loading' state
 */
export const Card = (props) => {
  const { title, isLoading, children, className, ...attributes } = props;

  // Combine default classeNames with possible extra prop classNames
  const classNames = `card br-1 bg-white ${className || ''}`;

  return (
    <div className={classNames} {...attributes} data-testid="card">
      {title && <CardHeader title={title} />}
      {isLoading === true ? <span data-testid="card-loading">Loading...</span> : children}
    </div>
  );
};
