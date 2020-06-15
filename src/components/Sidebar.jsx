import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import { ReactComponent as BurgerMenuSvg } from 'assets/burgerMenu.svg';

const leftFadeInAnimation = keyframes`
  from {
    transform: translate(-100%);
  }

  to {
    transform: translate(0);
  }
`;

const bgFadeInAnimation = keyframes`
  from {
    background: transparent;
  }

  to {
    background: rgba(0, 0, 0, .3);
  }
`;

const Trigger = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  border: 1px solid black;
`;

const SidebarContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1100;
  will-change: transform;
  animation: ${leftFadeInAnimation} 0.2s ease-in-out forwards;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  animation: ${bgFadeInAnimation} 0.2s ease-in-out forwards;
`;

/**
 * Component which renders a sidebar.
 * Sidebars content will be the children you pass as props.
 * When using `children` as function, it will passt a `closeAction` to manually close sidebar
 *
 * @param {Object|Function} props.children Sidebars content
 * @param {Boolean} props.isOpen The initial open state
 */
export const Sidebar = ({ children, isOpen: intialOpenState }) => {
  const [isOpen, setIsOpen] = useState(intialOpenState || false);

  const close = () => setIsOpen(false);

  return (
    <div>
      <Trigger onClick={() => setIsOpen(true)} className="pa-1" data-testid="open-trigger">
        <BurgerMenuSvg className="db" />
      </Trigger>
      {isOpen ? (
        <>
          {/* Container which covers up the whole site. On click it triggers sidebar close*/}
          <Backdrop onClick={() => close()} data-testid="backdrop" />
          <SidebarContent className="bg-primary" data-testid="content">
            <CloseSvg className="ma-1" onClick={() => close(false)} data-testid="close-trigger" />
            {typeof children === 'function' ? children({ closeAction: close }) : children}
          </SidebarContent>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
