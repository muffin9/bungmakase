// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';

// https://www.npmjs.com/package/@testing-library/jest-dom#with-another-jest-compatible-expect
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, beforeAll, afterEach, afterAll } from 'vitest';

// for msw
import { mswWorker } from '../mocks/server';

// add jest-dom matchers
expect.extend(matchers);

// // mock useLoginData to mimic a logged-in user
// vi.mock('./auth/AuthContext', () => ({
//   __esModule: true,
//   // for the hook return value
//   useLoginData: () => ({ userId: 1 }),
//   // for the provider default export
//   default: ({ children }) => children,
// }));

// msw setup and teardown below
// Establish API mocking before all tests.
beforeAll(() => mswWorker.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mswWorker.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => mswWorker.close());
