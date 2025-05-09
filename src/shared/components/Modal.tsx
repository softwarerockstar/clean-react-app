import React, { useEffect, useRef } from 'react';
import { styled, keyframes } from '../styles/stitches.config';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const scaleIn = keyframes({
  '0%': { transform: 'scale(0.95)' },
  '100%': { transform: 'scale(1)' },
});

const Overlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '$md',
  animation: `${fadeIn} 200ms ease-out`,
});

const ModalContainer = styled('div', {
  backgroundColor: '$white',
  borderRadius: '$md',
  boxShadow: '$xl',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '90vh',
  animation: `${scaleIn} 200ms ease-out`,
  
  variants: {
    size: {
      sm: { width: '400px' },
      md: { width: '600px' },
      lg: { width: '800px' },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

const ModalHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$md',
  borderBottom: '1px solid $gray200',
});

const ModalTitle = styled('h2', {
  margin: 0,
  fontSize: '$xl',
  fontWeight: '$semibold',
});

const CloseButton = styled('button', {
  background: 'none',
  border: 'none',
  fontSize: '$xl',
  cursor: 'pointer',
  padding: '$xs',
  borderRadius: '$sm',
  color: '$gray600',
  '&:hover': {
    backgroundColor: '$gray100',
    color: '$gray900',
  },
});

const ModalContent = styled('div', {
  padding: '$md',
  overflowY: 'auto',
});

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md' 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close on Escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  // Close when clicking outside the modal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer ref={modalRef} size={size}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close">
            &times;
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          {children}
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};