// src/shared/components/layout/Root.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '../../../shared/styles/stitches.config';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { globalStyles } from '../../../shared/styles/stitches.config';

const AppContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const Main = styled('main', {
  flex: '1 0 auto',
  padding: '$lg 0',
});

export const Root: React.FC = () => {
  // Apply global styles
  globalStyles();
  
  return (
    <AppContainer>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </AppContainer>
  );
};

export default Root;