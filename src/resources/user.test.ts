import mockAxios from 'axios';

import User from './user';
import MeetingMethods from "../constants/meeting-methods";

it('will set assigned filter', async () => {
  const resource = new User(mockAxios);

  expect(resource.assigned()).toHaveProperty('filters', {
    assigned: true,
  });
});

it('will set assigned filter to false', async () => {
  const resource = new User(mockAxios);

  expect(resource.assigned(false)).toHaveProperty('filters', {
    assigned: false,
  });
});

it('will set location filter using a number', async () => {
  const resource = new User(mockAxios);

  expect(resource.at(1)).toHaveProperty('filters', {
    location: 1,
  });
});

it('will set location filter using a string', async () => {
  const resource = new User(mockAxios);

  expect(resource.at('identifier')).toHaveProperty('filters', {
    location: 'identifier',
  });
});

it('will set the locatable filters as supplied', async () => {
  const resource = new User(mockAxios);
  const region = 'SK';

  expect(resource.located({ region })).toHaveProperty('filters', { region })
});

it('will set meeting method filter using a number', async () => {
  const resource = new User(mockAxios);

  expect(resource.supporting(MeetingMethods.PHONE_CALL)).toHaveProperty('filters', {
    method: MeetingMethods.PHONE_CALL,
  });
});

it('will set user filter using a string', async () => {
  const resource = new User(mockAxios);

  expect(resource.find('1')).toHaveProperty('filters', {
    user: '1',
  });
});

it('will set user filter using a number', async () => {
  const resource = new User(mockAxios);

  expect(resource.find(1)).toHaveProperty('filters', {
    user: 1,
  });
});

it('will set the page we are on', async () => {
  const resource = new User(mockAxios);

  expect(resource.on(4)).toHaveProperty('page', 4);
});

it('will set service filter using a number', async () => {
  const resource = new User(mockAxios);

  expect(resource.performing(1)).toHaveProperty('filters', {
    services: 1,
  });
});

it('will set service filter using an array of numbers', async () => {
  const resource = new User(mockAxios);

  expect(resource.performing([1, 2])).toHaveProperty('filters', {
    services: [1, 2],
  });
});

it('will set service filter using a string', async () => {
  const resource = new User(mockAxios);

  expect(resource.performing('identifier')).toHaveProperty('filters', {
    services: 'identifier',
  });
});

it('will set service filter using an array of strings', async () => {
  const resource = new User(mockAxios);

  expect(resource.performing(['identifier', 'other'])).toHaveProperty('filters', {
    services: ['identifier', 'other'],
  });
});

it('will set resource filter', async () => {
  const resource = new User(mockAxios);

  expect(resource.through('client_view')).toHaveProperty('filters', {
    resource: 'client_view',
  });
});

it('will set the limit given', async () => {
  const resource = new User(mockAxios);

  expect(resource.take(5)).toHaveProperty('limit', 5);
});

it('will set the sortable filter', async () => {
  const resource = new User(mockAxios);

  expect(resource.sortBy('first_name,-created')).toHaveProperty('sortable', 'first_name,-created');
});

it('can string all filterable options together', async () => {
  const resource = new User(mockAxios);

  const expected = expect(
    resource
      .assigned()
      .at(1)
      .located({ region: 'SK' })
      .performing([1, 2])
      .supporting(MeetingMethods.PHONE_CALL)
      .through('client_view')
      .sortBy('created')
      .find(1)
      .take(5)
      .on(1),
  );

  expected.toHaveProperty('filters', {
    assigned: true,
    location: 1,
    method: MeetingMethods.PHONE_CALL,
    region: 'SK',
    resource: 'client_view',
    services: [1, 2],
    user: 1,
  });
  expected.toHaveProperty('sortable', 'created');
  expected.toHaveProperty('limit', 5);
  expected.toHaveProperty('page', 1);
});

it('can get users without additional parameters', async () => {
  const resource = new User(mockAxios);

  await resource.get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('users', { params: {} });
});

it('can get users with additional parameters', async () => {
  const resource = new User(mockAxios);

  await resource
    .assigned()
    .at(1)
    .located({ region: 'SK' })
    .performing([1, 2])
    .supporting(MeetingMethods.PHONE_CALL)
    .through('client_view')
    .find(1)
    .sortBy('created')
    .take(5)
    .on(1)
    .get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('users', {
    params: {
      'filter[assignments]': true,
      'filter[client_view_meeting_method]': MeetingMethods.PHONE_CALL,
      'filter[location]': 1,
      'filter[meeting_method]': MeetingMethods.PHONE_CALL,
      'filter[province]': 'SK',
      'filter[resource]': 'client_view',
      'filter[service]': [1, 2],
      'filter[user]': 1,
      limit: 5,
      page: 1,
      sort: 'created',
    },
  });
});

it('can conditionally set a filter', async () => {
  const resource = new User(mockAxios);

  const expected = expect(
    resource.when(true, (user: User) => user.assigned()),
  );

  expected.toHaveProperty('filters', {
    assigned: true,
  });
});

it('can conditionally not set a filter', async () => {
  const resource = new User(mockAxios);

  const expected = expect(
    resource.when(false, (user: User) => user.assigned()),
  );

  expected.toHaveProperty('filters', {});
});
