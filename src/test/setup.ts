// src/test/setup.ts
import '@testing-library/jest-dom';
import { vi, beforeAll } from 'vitest';
import { DateTime } from 'luxon';

// Create a mock DateTime that returns a fixed date
const mockedNow = DateTime.fromISO('2025-05-01T12:00:00.000Z');

// Setup mock for DateTime.now()
beforeAll(() => {
  // Use type assertion to bypass TypeScript's strict checking
  vi.spyOn(DateTime, 'now').mockImplementation(() => mockedNow as DateTime<true>);
});

// Suppress React 18 console errors/warnings related to act() in tests
const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError(...args);
};

// Mock matchMedia for components that might use media queries
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});