import { setupServer } from 'msw/node';
import { homeHandlers } from './homeHandlers';

const handlers = [...homeHandlers];

export const mswWorker = setupServer(...handlers);
