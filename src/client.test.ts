import mockAxios from 'axios';
import Client from './client';
import { legacyParamsSerializer } from './helpers/axiosHelpers';

it('will be constructed using passed in options', async () => {
  Client('admin');

  expect(mockAxios.create).toHaveBeenCalledWith({
    baseURL: 'https://admin.coconutcalendar.com/api/v2/open',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    paramsSerializer: {
      serialize: legacyParamsSerializer,
    },
  });
});

it('will use the current origin if no domain is passed in', async () => {
  Client();

  expect(mockAxios.create).toHaveBeenCalledWith({
    baseURL: `${window.location.origin}/api/v2/open`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    paramsSerializer: {
      serialize: legacyParamsSerializer,
    },
  });
});
