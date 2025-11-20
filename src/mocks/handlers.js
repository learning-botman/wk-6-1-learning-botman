// src/mocks/handlers.js
import { rest } from 'msw';

// Example handlers; extend as needed for API endpoints
export const handlers = [
  // Example: a GET books endpoint
  rest.get('/api/books', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: 'Test Book', author: 'Author', price: 9.99 }
      ])
    );
  }),
];
