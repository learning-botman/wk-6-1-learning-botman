// src/setupTests.js
// Jest + React Testing Library setup
// Note: modern versions of @testing-library/jest-dom export their matchers
// from the package root. The older `extend-expect` entry point is removed.
import '@testing-library/jest-dom';

// MSW: start the mock server for all tests
import { server } from './mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
