// src/shared/components/Card.tsx
import { styled } from '../styles/stitches.config';

export const Card = styled('div', {
  backgroundColor: '$white',
  borderRadius: '$md',
  boxShadow: '$md',
  overflow: 'hidden',
  
  variants: {
    padding: {
      none: {
        padding: 0,
      },
      sm: {
        padding: '$sm',
      },
      md: {
        padding: '$md',
      },
      lg: {
        padding: '$lg',
      },
    },
  },
  
  defaultVariants: {
    padding: 'md',
  },
});

export const CardHeader = styled('div', {
  borderBottom: '1px solid $gray200',
  paddingBottom: '$md',
  marginBottom: '$md',
});

export const CardFooter = styled('div', {
  borderTop: '1px solid $gray200',
  paddingTop: '$md',
  marginTop: '$md',
});

export const CardTitle = styled('h3', {
  fontSize: '$xl',
  fontWeight: '$semibold',
  margin: 0,
});

export const CardContent = styled('div', {
  // Content styles
});