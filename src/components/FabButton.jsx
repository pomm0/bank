import React from 'react';
import styled from 'styled-components';

const StyledFabButton = styled.button`
  position: fixed;
  right: 16px;
  bottom: 16px;
  border: 0;
  outline: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

/**
 * A fab button which will be fixed in the bottom-right position of the site.
 */
export const FabButton = ({ children, ...attributes }) => {
  return (
    <StyledFabButton
      className="bg-primary df justify-center items-center c-pointer"
      type="button"
      {...attributes}
    >
      {children}
    </StyledFabButton>
  );
};
