import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
  margin: 0;
  padding: 0;

  li {
    a {
      display: block;
      color: initial;
      text-decoration: none;

      &.active,
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

/**
 * This component represents sites menu where all main sites are linked.
 *
 * @param {Function} props.onNavigate Will be called when the user navigated
 */
const MenuWithRouter = ({ onNavigate }) => {
  const onNavigation = () => typeof onNavigate === 'function' && onNavigate();

  return (
    <div className="w-100 pa-2 bg-primary">
      <Link to="/" onClick={onNavigation}>
        <img src="/logo.png" alt="mgruber" width="200" className="mb-2" data-testid="menu-logo" />
      </Link>
      <NavList>
        <li className="mb-1">
          <NavLink
            to="/"
            onClick={onNavigation}
            className={({ isActive }) => "ph-1 pv-2" + (isActive ? " active" : "")}
            data-testid="menu-link-dashboard"
          >
            Dashboard
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink
            to="/bank-transfer"
            onClick={onNavigation}
            className={({ isActive }) => "ph-1 pv-2" + (isActive ? " active" : "")}
            data-testid="menu-link-bank-transfer"
          >
            Überweisung
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink
            to="/card"
            onClick={onNavigation}
            className={({ isActive }) => "ph-1 pv-2" + (isActive ? " active" : "")}
            data-testid="menu-link-card"
          >
            Karten
          </NavLink>
        </li>
      </NavList>
    </div>
  );
};

export const Menu = MenuWithRouter;
