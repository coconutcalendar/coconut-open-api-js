import mockAxios from 'axios';

import WaitTime from './wait-time';

it('will set the location', async () => {
  const resource = new WaitTime(mockAxios);

  await resource.at(3).get();

  expect(resource.at(3)).toHaveProperty('location_id', 3);
  expect(mockAxios.get).toHaveBeenCalledWith('wait-time-average/3', { params: {} });
});

it('will set the page we are on', async () => {
  const resource = new WaitTime(mockAxios);

  await resource.on(4).get();

  expect(resource.on(4)).toHaveProperty('page', 4);
  expect(mockAxios.get).toHaveBeenCalledWith('wait-time-average', { params: { 'page': 4 } });
});

it('will set the limit given', async () => {
  const resource = new WaitTime(mockAxios);

  await resource.take(5).get();

  expect(resource.take(5)).toHaveProperty('limit', 5);
  expect(mockAxios.get).toHaveBeenCalledWith('wait-time-average', { params: { 'limit': 5 } });
});

it('can get wait times without additional parameters', async () => {
  const resource = new WaitTime(mockAxios);

  await resource.get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('wait-time-average', { params: {} });
});
