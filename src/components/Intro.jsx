import React from 'react';

/**
 * This component represent a site intro.
 * It allows defining a title and a description;
 *
 * @param {String} props.title The title
 * @param {String} props.description The description
 */
export const Intro = ({ title, description, ...attributes }) => {
  return (
    <div {...attributes} data-testid="intro">
      {title ? <h1 data-testid="intro-title">{title}</h1> : <></>}
      {description ? <p data-testid="intro-description">{description}</p> : <></>}
    </div>
  );
};
