import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import apiList from '../api/apiList';
import { productsList } from '../data/products';
import 'whatwg-fetch';

export const restHandlers = [
  rest.get(apiList.product, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsList));
  })
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

expect.extend(matchers);
