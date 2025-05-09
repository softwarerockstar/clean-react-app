import { createStitches } from '@stitches/react';

export const { 
  styled, 
  css, 
  globalCss, 
  keyframes, 
  getCssText, 
  theme, 
  createTheme, 
  config 
} = createStitches({
  theme: {
    colors: {
      primary: '#0066cc',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      light: '#f8f9fa',
      dark: '#343a40',
      white: '#ffffff',
      black: '#000000',
      gray100: '#f8f9fa',
      gray200: '#e9ecef',
      gray300: '#dee2e6',
      gray400: '#ced4da',
      gray500: '#adb5bd',
      gray600: '#6c757d',
      gray700: '#495057',
      gray800: '#343a40',
      gray900: '#212529',
    },
    space: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      xxxl: '2rem',
    },
    fonts: {
      system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    radii: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.5rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    dark: '(prefers-color-scheme: dark)',
  },
  utils: {
    p: (value: any) => ({
      padding: value,
    }),
    pt: (value: any) => ({
      paddingTop: value,
    }),
    pr: (value: any) => ({
      paddingRight: value,
    }),
    pb: (value: any) => ({
      paddingBottom: value,
    }),
    pl: (value: any) => ({
      paddingLeft: value,
    }),
    px: (value: any) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value: any) => ({
      margin: value,
    }),
    mt: (value: any) => ({
      marginTop: value,
    }),
    mr: (value: any) => ({
      marginRight: value,
    }),
    mb: (value: any) => ({
      marginBottom: value,
    }),
    ml: (value: any) => ({
      marginLeft: value,
    }),
    mx: (value: any) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: any) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
});

// Define global styles
export const globalStyles = globalCss({
  '*': { 
    margin: 0, 
    padding: 0,
    boxSizing: 'border-box',
  },
  'html, body': { 
    fontFamily: '$system',
    fontSize: '16px',
    lineHeight: '$normal',
    color: '$gray800',
  },
  a: { 
    color: '$primary',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  'h1, h2, h3, h4, h5, h6': {
    fontWeight: '$bold',
    lineHeight: 1.2,
    margin: '0 0 $md 0',
  },
  h1: { fontSize: '$xxxl' },
  h2: { fontSize: '$xxl' },
  h3: { fontSize: '$xl' },
  h4: { fontSize: '$lg' },
  h5: { fontSize: '$md' },
  h6: { fontSize: '$sm' },
  p: {
    marginBottom: '$md',
  },
});