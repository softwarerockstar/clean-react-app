// src/shared/components/Container.tsx
import { styled } from '../styles/stitches.config';

export const Container = styled('div', {
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '$md',
  paddingRight: '$md',
  
  variants: {
    size: {
      sm: {
        maxWidth: '640px',
      },
      md: {
        maxWidth: '768px',
      },
      lg: {
        maxWidth: '1024px',
      },
      xl: {
        maxWidth: '1280px',
      },
      full: {
        maxWidth: 'none',
      },
    },
  },
  
  defaultVariants: {
    size: 'lg',
  },
});