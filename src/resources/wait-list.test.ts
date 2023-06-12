import mockAxios from 'axios';

import Days from '../constants/days';
import Attendee from '../models/attendee';
import Preference from '../models/preference';
import WaitList from './wait-list';
import Service from './service';

it('will set location filter using a number', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.at(1)).toHaveProperty('relationships', {
    location: 1,
  });
});

it('will set location filter using a numeric string', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.at('1')).toHaveProperty('relationships', {
    location: '1',
  });
});

it('will set service filter using a number', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.seeking(1)).toHaveProperty('relationships', {
    service: 1,
  });
});

it('will set service filter using a numeric string', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.seeking('1')).toHaveProperty('relationships', {
    service: '1',
  });
});

it('will set user filter using a number', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.with(1)).toHaveProperty('relationships', {
    user: 1,
  });
});

it('will set user filter using a numeric string', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.with('1')).toHaveProperty('relationships', {
    user: '1',
  });
});

it('will set the client parameter using a number', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.belonging(1)).toHaveProperty('parameters', {
    client: 1,
  });
});

it('will set the client parameter using a numeric string', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.belonging('1')).toHaveProperty('parameters', {
    client: '1',
  });
});

it('will set the includes parameter using a comma separated string', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.include('relationships,go,here')).toHaveProperty('parameters', {
    include: 'relationships,go,here',
  });
});

it('can set additional details for the wait list request', async () => {
  const resource = new WaitList(mockAxios);

  expect(resource.provided('additional notes')).toHaveProperty('attributes', {
    notes: 'additional notes',
  });
});

it('can set an attendee for the wait list request', async () => {
  const resource = new WaitList(mockAxios);
  const attendee = new Attendee();

  expect(resource.for(attendee)).toHaveProperty('relationships', {
    attendee,
  });
});

it('can set a single preference for the wait list request', async () => {
  const resource = new WaitList(mockAxios);
  const preference = new Preference();

  expect(resource.prefers(preference)).toHaveProperty('relationships', {
    preferences: [preference],
  });
});

it('can set a multiple preferences for the wait list request', async () => {
  const resource = new WaitList(mockAxios);
  const preference = new Preference();

  expect(resource.prefers([preference, preference])).toHaveProperty('relationships', {
    preferences: [preference, preference],
  });
});

it('can create a new wait list request for a given client using only required attributes', async () => {
  const resource = new WaitList(mockAxios);
  const attendee = new Attendee();
  const preference = new Preference();

  await resource
    .for(attendee.named('Jane', 'Doe').reachable({ email: 'jane@doe.com' }))
    .at(1)
    .seeking(2)
    .prefers(preference.next())
    .add();

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('requests', {
    data: {
      attributes: {},
      relationships: {
        client: {
          data: {
            attributes: {
              email: 'jane@doe.com',
              first_name: 'Jane',
              last_name: 'Doe',
            },
            type: 'clients',
          },
        },
        location: {
          data: {
            id: '1',
            type: 'locations',
          },
        },
        preferences: {
          data: [
            {
              attributes: {
                start: Preference.now(),
                type: Preference.NEXT_AVAILABLE,
              },
              type: 'request-preferences',
            },
          ],
        },
        service: {
          data: {
            id: '2',
            type: 'services',
          },
        },
      },
      type: 'requests',
    },
  });
});

it('can create a new wait list request for a given client using all attributes', async () => {
  const resource = new WaitList(mockAxios);
  const attendee = new Attendee();
  const preference = new Preference();

  await resource
    .for(attendee.named('Jane', 'Doe').reachable({ email: 'jane@doe.com' }))
    .at(1)
    .seeking(2)
    .with(3)
    .provided('some more notes')
    .prefers(preference.on(Days.WEDNESDAY).between('9:00 AM', '11:00 AM'))
    .add();

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('requests', {
    data: {
      attributes: {
        details: 'some more notes',
      },
      relationships: {
        client: {
          data: {
            attributes: {
              email: 'jane@doe.com',
              first_name: 'Jane',
              last_name: 'Doe',
            },
            type: 'clients',
          },
        },
        location: {
          data: {
            id: '1',
            type: 'locations',
          },
        },
        preferences: {
          data: [
            {
              attributes: {
                day: Days.WEDNESDAY,
                end: '11:00 AM',
                start: '9:00 AM',
                type: Preference.CERTAIN_DAYS,
              },
              type: 'request-preferences',
            },
          ],
        },
        service: {
          data: {
            id: '2',
            type: 'services',
          },
        },
        user: {
          data: {
            id: '3',
            type: 'users',
          },
        },
      },
      type: 'requests',
    },
  });
});

it('can retrieve a clients matching wait list request', async () => {
  const resource = new WaitList(mockAxios);

  await resource
    .belonging(1)
    .include('preferences')
    .find(2);

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('clients/1/requests/2', {
    params: {
      include: 'preferences',
    },
  });
});

it('can retrieve a clients matching wait list request without including preferences', async () => {
  const resource = new WaitList(mockAxios);

  await resource.belonging(1).find(2);

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('clients/1/requests/2', { params: {} });
});

it('can update a clients wait list request using a single relation', async () => {
  const resource = new WaitList(mockAxios);

  await resource
    .belonging(1)
    .with(2)
    .update(3);

  expect(mockAxios.patch).toHaveBeenCalledTimes(1);
  expect(mockAxios.patch).toHaveBeenCalledWith('clients/1/requests/3', {
    data: {
      attributes: {},
      relationships: {
        user: {
          data: {
            id: '2',
            type: 'users',
          },
        },
      },
      type: 'requests',
    },
  });
});

it('can update a clients wait list request using attributes and a relation', async () => {
  const resource = new WaitList(mockAxios);
  const preference = new Preference();

  await resource
    .belonging(1)
    .with(2)
    .prefers(preference.on(Days.WEDNESDAY).between('9:00 AM', '11:00 AM'))
    .provided('some notes here')
    .update(3);

  expect(mockAxios.patch).toHaveBeenCalledTimes(1);
  expect(mockAxios.patch).toHaveBeenCalledWith('clients/1/requests/3', {
    data: {
      attributes: {
        details: 'some notes here',
      },
      relationships: {
        preferences: {
          data: [
            {
              attributes: {
                day: Days.WEDNESDAY,
                end: '11:00 AM',
                start: '9:00 AM',
                type: Preference.CERTAIN_DAYS,
              },
              type: 'request-preferences',
            },
          ],
        },
        user: {
          data: {
            id: '2',
            type: 'users',
          },
        },
      },
      type: 'requests',
    },
  });
});

it('can delete a clients wait list request', async () => {
  const resource = new WaitList(mockAxios);

  await resource.belonging(1).remove(2);

  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  expect(mockAxios.delete).toHaveBeenCalledWith('clients/1/requests/2');
});

it('can conditionally set a filter', async () => {
  const resource = new WaitList(mockAxios);

  const expected = expect(resource.when(true, (list: WaitList) => list.at(1)));

  expected.toHaveProperty('relationships', {
    location: 1,
  });
});

it('can conditionally not set a filter', async () => {
  const resource = new WaitList(mockAxios);

  const expected = expect(resource.when(false, (list: WaitList) => list.at(1)));

  expected.toHaveProperty('relationships', {});
});
