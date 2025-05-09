// src/shared/components/layout/Footer.tsx
import React from 'react';
import { styled } from '../../../shared/styles/stitches.config';
import { Container } from '../Container';

const FooterContainer = styled('footer', {
  backgroundColor: '$gray100',
  padding: '$lg 0',
  borderTop: '1px solid $gray200',
});

const FooterContent = styled(Container, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Copyright = styled('p', {
  margin: 0,
  color: '$gray700',
});

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          &copy; {new Date().getFullYear()} Clean React App
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;