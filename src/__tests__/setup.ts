import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubEnv('VITE_GEMINI_API_KEY', 'test_key');
vi.stubEnv('VITE_BACKBOARD_API_KEY', 'test_key');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
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
