import React from 'react';
import { Menu } from 'components';
import { Sidebar } from 'components';

/**
 * This represents the sites main layout.
 * It is a one column layout on mobile (With menu in Sidebar)
 * and a two column layout on desktop (With menu in the left column)
 */
export const Main = ({ children }) => {
  return (
    <div className="df flex-row flex-grow-1">
      {/* Mobile burger menu */}
      <div className="df dn-md flex-grow-0 flex-shrink-0" data-testid="main-mobile-menu">
        <Sidebar>{({ closeAction }) => <Menu onNavigate={closeAction} />}</Sidebar>
      </div>
      {/* Desktop menu */}
      <div className="dn df-md flex-grow-0 flex-shrink-0" data-testid="main-desktop-menu">
        <Menu />
      </div>
      <div className="df mt-4 pa-2 flex-grow-1">
        <div className="w-100" data-testid="main-children">
          {children}
        </div>
      </div>
    </div>
  );
};
