import mockAxios from 'axios';

import MeetingMethods from "../constants/meeting-methods";
import Service from './service';

it('will set assigned filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.assigned()).toHaveProperty('filters', {
    assigned: true,
  });
});

it('will set assigned filter to false', async () => {
  const resource = new Service(mockAxios);

  expect(resource.assigned(false)).toHaveProperty('filters', {
    assigned: false,
  });
});

it('will set the invite only resources filter to true by default', async () => {
  const resource = new Service(mockAxios);

  expect(resource.withInviteOnly()).toHaveProperty('filters', {
    invite_only_resources: true,
  });
});

it('can set the invite only resources filter to false', async () => {
  const resource = new Service(mockAxios);

  expect(resource.withInviteOnly(false)).toHaveProperty('filters', {
    invite_only_resources: false,
  });
});

it('will set location filter using a number', async () => {
  const resource = new Service(mockAxios);

  expect(resource.at(1)).toHaveProperty('filters', {
    location: 1,
  });
});

it('will set location filter using a string', async () => {
  const resource = new Service(mockAxios);

  expect(resource.at('identifier')).toHaveProperty('filters', {
    location: 'identifier',
  });
});

it('will set location category filter using a string', async () => {
  const resource = new Service(mockAxios);

  expect(resource.withinLocationCategory('identifier')).toHaveProperty('filters', {
    location_category: 'identifier',
  });
});

it('will set location category filter using a number', async () => {
  const resource = new Service(mockAxios);

  expect(resource.withinLocationCategory(1)).toHaveProperty('filters', {
    location_category: 1,
  });
});

it('will set the locatable filters as supplied', async () => {
  const resource = new Service(mockAxios);
  const region = 'SK';

  expect(resource.located({ region })).toHaveProperty('filters', { region })
});

it('will set meeting method filter using a number', async () => {
  const resource = new Service(mockAxios);

  expect(resource.supporting(MeetingMethods.PHONE_CALL)).toHaveProperty('filters', {
    method: MeetingMethods.PHONE_CALL,
  });
});

it('will set user filter using a number', async () => {
  const resource = new Service(mockAxios);

  expect(resource.by(1)).toHaveProperty('filters', {
    user: 1,
  });
});

it('will set user filter using a string', async () => {
  const resource = new Service(mockAxios);

  expect(resource.by('identifier')).toHaveProperty('filters', {
    user: 'identifier',
  });
});

it('will set user category filter using a number', async () => {
  const resource = new Service(mockAxios);

  expect(resource.withinUserCategory(1)).toHaveProperty('filters', {
    user_category: 1,
  });
});

it('will set user category filter using a string', async () => {
  const resource = new Service(mockAxios);

  expect(resource.withinUserCategory('identifier')).toHaveProperty('filters', {
    user_category: 'identifier',
  });
});

it('will set category filter using a number', async () => {
  const resource = new Service(mockAxios);

  expect(resource.in(1)).toHaveProperty('filters', {
    category: 1,
  });
});

it('will set category filter using a string', async () => {
  const resource = new Service(mockAxios);

  expect(resource.in('identifier')).toHaveProperty('filters', {
    category: 'identifier',
  });
});

it('will set the invite only filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.invitable()).toHaveProperty('filters', {
    invitable: 1,
  });
});

it('will set the group filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.group()).toHaveProperty('filters', {
    group: 1,
  });
});

it('will set the individual filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.individual()).toHaveProperty('filters', {
    group: 0,
  });
});

it('will set the resource filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.through('client_view')).toHaveProperty('filters', {
    resource: 'client_view',
  });
});

it('will set the page we are on', async () => {
  const resource = new Service(mockAxios);

  expect(resource.on(4)).toHaveProperty('page', 4);
});

it('will set the limit given', async () => {
  const resource = new Service(mockAxios);

  expect(resource.take(5)).toHaveProperty('limit', 5);
});

it('will set the sortable filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.sortBy('name,-created')).toHaveProperty('sortable', 'name,-created');
});

it('will set the preferred filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.preferred()).toHaveProperty('filters', {
    preferred: 1,
  })
});

it('can string all filterable options together', async () => {
  const resource = new Service(mockAxios);

  const expected = expect(
    resource
      .assigned()
      .at(1)
      .by(2)
      .in(3)
      .invitable()
      .individual()
      .located({ region: 'SK' })
      .preferred()
      .supporting(MeetingMethods.PHONE_CALL)
      .through('client_view')
      .withInviteOnly()
      .withinUserCategory(1)
      .sortBy('created')
      .take(5)
      .on(1),
  );

  expected.toHaveProperty('filters', {
    assigned: true,
    category: 3,
    group: 0,
    invitable: 1,
    invite_only_resources: true,
    location: 1,
    method: MeetingMethods.PHONE_CALL,
    preferred: 1,
    region: 'SK',
    resource: 'client_view',
    user: 2,
    user_category: 1,
  });
  expected.toHaveProperty('sortable', 'created');
  expected.toHaveProperty('limit', 5);
  expected.toHaveProperty('page', 1);
});

it('can get services without additional parameters', async () => {
  const resource = new Service(mockAxios);

  await resource.get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('services', { params: {} });
});

it('can get services with additional parameters', async () => {
  const resource = new Service(mockAxios);

  await resource
    .assigned()
    .at(1)
    .by(2)
    .in(3)
    .invitable()
    .individual()
    .located({ region: 'SK' })
    .preferred()
    .supporting(MeetingMethods.PHONE_CALL)
    .through('client_view')
    .withInviteOnly()
    .withinUserCategory(1)
    .sortBy('created')
    .take(5)
    .on(1)
    .get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('services', {
    params: {
      'filter[assignments]': 1,
      'filter[category]': 3,
      'filter[client_view_meeting_method]': MeetingMethods.PHONE_CALL,
      'filter[group]': 0,
      'filter[invite_only]': 1,
      'filter[invite_only_resources]': 1,
      'filter[location]': 1,
      'filter[preferred]': 1,
      'filter[province]': 'SK',
      'filter[resource]': 'client_view',
      'filter[user]': 2,
      'filter[user_category]': 1,
      limit: 5,
      page: 1,
      sort: 'created',
    },
  });
});

it('can conditionally set a filter', async () => {
  const resource = new Service(mockAxios);

  const expected = expect(
    resource.when(true, (service: Service) => service.assigned()),
  );

  expected.toHaveProperty('filters', {
    assigned: true,
  });
});

it('can conditionally not set a filter', async () => {
  const resource = new Service(mockAxios);

  const expected = expect(
    resource.when(false, (service: Service) => service.assigned()),
  );

  expected.toHaveProperty('filters', {});
});
