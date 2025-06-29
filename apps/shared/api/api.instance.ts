import ky from 'ky';
import { HttpError } from '../lib/logger';

export const api = ky.create({
  prefixUrl: 'http://localhost:3000',
  timeout: false,
  hooks: {
    beforeRequest: [
      async (request) => {
        return request;
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        if (response.ok) {
          console.log('response', response);
        }
        return response;
      },
    ],
    beforeError: [
      async (error) => {
        HttpError.backend(error);
        return error;
      },
    ],
  },
});
