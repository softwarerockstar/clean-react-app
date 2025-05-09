import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '../../../shared/styles/stitches.config';
import { Container } from '../Container';
import { Button } from '../Button';

const NotFoundContainer = styled(Container, {
  textAlign: 'center',
  padding: '$xxl 0',
});

const Title = styled('h1', {
  fontSize: '$xxxl',
  fontWeight: '$bold',
  marginBottom: '$lg',
  color: '$dark',
});

const Message = styled('p', {
  fontSize: '$xl',
  color: '$gray700',
  marginBottom: '$xl',
});

export const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <Title>404 - Page Not Found</Title>
      <Message>
        The page you are looking for does not exist or has been moved.
      </Message>
      <Button as={Link} to="/">
        Return to Home
      </Button>
    </NotFoundContainer>
  );
};

export default NotFoundPage;