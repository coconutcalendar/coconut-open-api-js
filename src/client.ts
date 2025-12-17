import axios, { AxiosInstance } from 'axios';
import { legacyParamsSerializer } from './helpers/axiosHelpers';

const Client = (domain?: string): AxiosInstance => {
  return axios.create({
    baseURL: domain ? `https://${domain}.coconutcalendar.com/api/v2/open` : `${window.location.origin}/api/v2/open`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    paramsSerializer: {
      serialize: legacyParamsSerializer,
    },
  });
};

export default Client;
