import mockAxios from 'axios';

import MeetingMethods from "../constants/meeting-methods";
import { STORAGE_KEY } from '../helpers/token';
import Location from './location';

it('will set assigned filter', async () => {
  const resource = new Location(mockAxios);

  expect(resource.assigned()).toHaveProperty('filters', {
    assigned: true,
  });
});

it('will set assigned filter to false', async () => {
  const resource = new Location(mockAxios);

  expect(resource.assigned(false)).toHaveProperty('filters', {
    assigned: false,
  });
});

it('will set user filter using a number', async () => {
  const resource = new Location(mockAxios);

  expect(resource.containing(1)).toHaveProperty('filters', {
    user: 1,
  });
});

it('will set user filter using a string', async () => {
  const resource = new Location(mockAxios);

  expect(resource.containing('identifier')).toHaveProperty('filters', {
    user: 'identifier',
  });
});

it('will set user category filter using a number', async () => {
  const resource = new Location(mockAxios);

  expect(resource.withinUserCategory(1)).toHaveProperty('filters', {
    user_category: 1,
  });
});

it('will set user category filter using a string', async () => {
  const resource = new Location(mockAxios);

  expect(resource.withinUserCategory('identifier')).toHaveProperty('filters', {
    user_category: 'identifier',
  });
});

it('will set the invite only filter', async () => {
  const resource = new Location(mockAxios);

  expect(resource.invitable()).toHaveProperty('filters', {
    invitable: 1,
  });
});

it('will set the invite only resources filter to true by default', async () => {
  const resource = new Location(mockAxios);

  expect(resource.withInviteOnly()).toHaveProperty('filters', {
    invite_only_resources: true,
  });
});

it('can set the invite only resources filter to false', async () => {
  const resource = new Location(mockAxios);

  expect(resource.withInviteOnly(false)).toHaveProperty('filters', {
    invite_only_resources: false,
  });
});

it('will set the page we are on', async () => {
  const resource = new Location(mockAxios);

  expect(resource.on(4)).toHaveProperty('page', 4);
});

it('will set service filter using a number', async () => {
  const resource = new Location(mockAxios);

  expect(resource.providing(1)).toHaveProperty('filters', {
    services: 1,
  });
});

it('will set service filter using an array of numbers', async () => {
  const resource = new Location(mockAxios);

  expect(resource.providing([1, 2])).toHaveProperty('filters', {
    services: [1, 2],
  });
});

it('will set service filter using a string', async () => {
  const resource = new Location(mockAxios);

  expect(resource.providing('identifier')).toHaveProperty('filters', {
    services: 'identifier',
  });
});

it('will set service filter using an array of strings', async () => {
  const resource = new Location(mockAxios);

  expect(resource.providing(['identifier', 'other'])).toHaveProperty('filters', {
    services: ['identifier', 'other'],
  });
});

it('will set meeting method filter using a number', async () => {
  const resource = new Location(mockAxios);

  expect(resource.supporting(MeetingMethods.PHONE_CALL)).toHaveProperty('filters', {
    method: MeetingMethods.PHONE_CALL,
  });
});

it('will set resource filter', async () => {
  const resource = new Location(mockAxios);

  expect(resource.through('client_view')).toHaveProperty('filters', {
    resource: 'client_view',
  });
});

it('will set the physical locations only filter', async () => {
  const resource = new Location(mockAxios);

  expect(resource.physical()).toHaveProperty('filters', {
    virtual: 0,
  });
});

it('will set the virtual locations only filter', async () => {
  const resource = new Location(mockAxios);

  expect(resource.virtual()).toHaveProperty('filters', {
    virtual: 1,
  });
});

it('will set the limit given', async () => {
  const resource = new Location(mockAxios);

  expect(resource.take(5)).toHaveProperty('limit', 5);
});

it('will set the sortable filter', async () => {
  const resource = new Location(mockAxios);

  expect(resource.sortBy('first_name,-created')).toHaveProperty('sortable', 'first_name,-created');
});

it('will set the preferred filter', async () => {
  const resource = new Location(mockAxios);

  expect(resource.preferred()).toHaveProperty('filters', {
    preferred: 1,
  })
});

it('will set the locatable filters as supplied', async () => {
  const resource = new Location(mockAxios);
  const city = 'Fake City';
  const country = 'FC';
  const region = 'FR';

  expect(resource.located({ city, country, region })).toHaveProperty('filters', {
    city,
    country,
    region,
  })
});

it('can string all filterable options together', async () => {
  const resource = new Location(mockAxios);

  const expected = expect(
    resource
      .assigned()
      .providing([1, 2])
      .containing(1)
      .invitable()
      .sortBy('created')
      .physical()
      .preferred()
      .supporting(MeetingMethods.PHONE_CALL)
      .through('client_view')
      .located({ city: 'Fake City', country: 'FC', region: 'FR' })
      .withInviteOnly()
      .withinUserCategory(1)
      .take(5)
      .on(1),
  );

  expected.toHaveProperty('filters', {
    assigned: true,
    city: 'Fake City',
    country: 'FC',
    invitable: 1,
    invite_only_resources: true,
    method: MeetingMethods.PHONE_CALL,
    preferred: 1,
    region: 'FR',
    resource: 'client_view',
    services: [1, 2],
    user: 1,
    user_category: 1,
    virtual: 0,
  });
  expected.toHaveProperty('sortable', 'created');
  expected.toHaveProperty('limit', 5);
  expected.toHaveProperty('page', 1);
});

it('can get locations without additional parameters', async () => {
  const resource = new Location(mockAxios);

  await resource.get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('locations', { params: {} });
});

it('can get locations with additional parameters', async () => {
  const resource = new Location(mockAxios);

  await resource
    .assigned()
    .providing([1, 2])
    .containing(1)
    .invitable()
    .physical()
    .preferred()
    .supporting(MeetingMethods.PHONE_CALL)
    .through('client_view')
    .located({ city: 'Fake City', country: 'FC', region: 'FR' })
    .withInviteOnly()
    .withinUserCategory(1)
    .sortBy('created')
    .take(5)
    .on(1)
    .get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('locations', {
    params: {
      'filter[assignments]': 1,
      'filter[city]': 'Fake City',
      'filter[client_view_meeting_method]': MeetingMethods.PHONE_CALL,
      'filter[country]': 'FC',
      'filter[invite_only]': 1,
      'filter[invite_only_resources]': 1,
      'filter[preferred]': 1,
      'filter[province]': 'FR',
      'filter[service]': [1, 2],
      'filter[resource]': 'client_view',
      'filter[user]': 1,
      'filter[user_category]': 1,
      'filter[virtual]': 0,
      limit: 5,
      page: 1,
      sort: 'created',
    },
  });
});

it('can conditionally set a filter', async () => {
  const resource = new Location(mockAxios);

  const expected = expect(
    resource.when(true, (location: Location) => location.assigned()),
  );

  expected.toHaveProperty('filters', {
    assigned: true,
  });
});

it('can conditionally not set a filter', async () => {
  const resource = new Location(mockAxios);

  const expected = expect(
    resource.when(false, (location: Location) => location.assigned()),
  );

  expected.toHaveProperty('filters', {});
});

it('can supply suggestions based on the provided query', async () => {
  const resource = new Location(mockAxios);

  await resource.suggest('Fake City');

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('location-suggestions', {
    headers: {
      'x-location-details-token': sessionStorage.getItem('location-details-token'),
    },
    params: {
      'filter[query]': 'Fake City',
    },
  });
});

it('will reuse a token if it is already in session storage when fetching suggestions', async () => {
  sessionStorage.setItem(STORAGE_KEY, 'value');

  const resource = new Location(mockAxios);

  await resource.suggest('Fake City');

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('location-suggestions', {
    headers: {
      'x-location-details-token': 'value',
    },
    params: {
      'filter[query]': 'Fake City',
    },
  });
});

it('can fetch details for a given location identifier received from a suggestion', async () => {
  sessionStorage.setItem(STORAGE_KEY, 'value');

  const resource = new Location(mockAxios);

  await resource.details('random_string_of_characters');

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('location-details/random_string_of_characters', {
    headers: {
      'x-location-details-token': 'value',
    },
  });
  expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
});
