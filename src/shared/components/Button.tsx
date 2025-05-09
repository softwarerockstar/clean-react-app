import { styled } from '../styles/stitches.config';

export const Button = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$md',
  fontSize: '$md',
  fontWeight: '$medium',
  padding: '$sm $lg',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: '1px solid transparent',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$white',
        '&:hover': {
          backgroundColor: 'color-mix(in srgb, $primary 80%, black)',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px rgba(0, 102, 204, 0.5)',
          outline: 'none',
        },
      },
      secondary: {
        backgroundColor: '$gray200',
        color: '$gray800',
        '&:hover': {
          backgroundColor: '$gray300',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px rgba(108, 117, 125, 0.5)',
          outline: 'none',
        },
      },
      danger: {
        backgroundColor: '$danger',
        color: '$white',
        '&:hover': {
          backgroundColor: 'color-mix(in srgb, $danger 80%, black)',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px rgba(220, 53, 69, 0.5)',
          outline: 'none',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$gray800',
        '&:hover': {
          backgroundColor: '$gray100',
        },
        '&:focus': {
          boxShadow: '0 0 0 2px rgba(222, 226, 230, 0.5)',
          outline: 'none',
        },
      },
    },
    size: {
      sm: {
        fontSize: '$sm',
        padding: '$xs $sm',
      },
      md: {
        fontSize: '$md',
        padding: '$sm $lg',
      },
      lg: {
        fontSize: '$lg',
        padding: '$md $xl',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});