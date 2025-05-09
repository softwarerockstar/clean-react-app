// src/shared/components/layout/Navbar.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { styled } from '../../../shared/styles/stitches.config';
import { Container } from '../Container';

const NavContainer = styled('nav', {
  backgroundColor: '$white',
  borderBottom: '1px solid $gray200',
  padding: '$md 0',
});

const NavContent = styled(Container, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Logo = styled(Link, {
  fontSize: '$xl',
  fontWeight: '$bold',
  color: '$primary',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
});

const NavLinks = styled('div', {
  display: 'flex',
  gap: '$lg',
});

const NavItem = styled(NavLink, {
  color: '$gray700',
  fontSize: '$md',
  textDecoration: 'none',
  '&:hover': {
    color: '$primary',
    textDecoration: 'none',
  },
  '&.active': {
    color: '$primary',
    fontWeight: '$semibold',
  },
});

export const Navbar: React.FC = () => {
  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">Clean React App</Logo>
        <NavLinks>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/posts">Posts</NavItem>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;