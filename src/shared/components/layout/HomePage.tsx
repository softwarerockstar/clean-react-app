import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '../../../shared/styles/stitches.config';
import { Container } from '../Container';
import { Button } from '../Button';

const Hero = styled('div', {
  textAlign: 'center',
  padding: '$xxl 0',
});

const Title = styled('h1', {
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  fontWeight: '$bold',
  marginBottom: '$lg',
  color: '$dark',
});

const Subtitle = styled('p', {
  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
  color: '$gray700',
  maxWidth: '800px',
  margin: '0 auto $xl',
  lineHeight: '$relaxed',
});

const Actions = styled('div', {
  display: 'flex',
  gap: '$md',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

export const HomePage: React.FC = () => {
  return (
    <Container>
      <Hero>
        <Title>Welcome to Clean React App</Title>
        <Subtitle>
          A modern React application built with a pragmatic clean architecture approach.
          This app demonstrates best practices for structuring React applications
          with a focus on maintainability and scalability.
        </Subtitle>
        <Actions>
          <Button as={Link} to="/posts" size="lg">
            View Posts
          </Button>
          <Button 
            as="a" 
            href="https://github.com/your-repo/clean-react-app" 
            variant="secondary" 
            size="lg"
          >
            View on GitHub
          </Button>
        </Actions>
      </Hero>
    </Container>
  );
};

export default HomePage;