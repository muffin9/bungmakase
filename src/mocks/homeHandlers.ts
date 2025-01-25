import { http, HttpResponse } from 'msw';

export const homeHandlers = [
  http.get('http://localhost:3000', () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
