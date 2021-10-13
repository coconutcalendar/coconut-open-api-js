import mockAxios from 'axios';
import MeetingMethods from "../constants/meeting-methods";

import Visibilities from "../constants/visibilities";

import TimeSlot from './time-slot';

it('will set the invite only resources filter to true by default', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.withInviteOnly()).toHaveProperty('filters', {
    invite_only_resources: true,
  });
});

it('can set the invite only resources filter to false', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.withInviteOnly(false)).toHaveProperty('filters', {
    invite_only_resources: false,
  });
});

it('will set location filter using a number', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.at(1)).toHaveProperty('filters', {
    location: 1,
  });
});

it('will set start and end filters', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.between('2018-01-01', '2018-01-31')).toHaveProperty('filters', {
    end: '2018-01-31',
    start: '2018-01-01',
  });
});

it('will set user filter using a number', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.by(1)).toHaveProperty('filters', {
    user: 1,
  });
});

it('will set users filter using a number', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.attendedBy(1)).toHaveProperty('filters', {
    users: 1,
  });
});

it('will set users filter using an array of numbers', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.attendedBy([1, 2])).toHaveProperty('filters', {
    users: [1, 2],
  });
});

it('will set an appointment exclusion filter using a number', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.excluding(1)).toHaveProperty('filters', {
    exclusion: 1,
  });
});

it('will set service filter using a number', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.for(1)).toHaveProperty('filters', {
    services: 1,
  });
});

it('will set service filter using an array of numbers', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.for([1, 2])).toHaveProperty('filters', {
    services: [1, 2],
  });
});

it('will set a meeting method filter using a number', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.method(MeetingMethods.PHONE_CALL)).toHaveProperty('filters', {
    method: MeetingMethods.PHONE_CALL,
  });
});

it('will set timezone filter', async () => {
  const resource = new TimeSlot(mockAxios);

  const timezones = ['America/Chicago', 'America/Toronto', 'Europe/Amsterdam', 'Europe/Paris'];
  const timezone = timezones[Math.floor(Math.random() * timezones.length)];

  expect(resource.in(timezone)).toHaveProperty('filters', {
    timezone,
  });
});

it('will set supported locales filter', async () => {
  const resource = new TimeSlot(mockAxios);

  const locales = ['en', 'es'];

  expect(resource.supporting(locales)).toHaveProperty('filters', {
    locales,
  });
});

it('will set a visibility filter', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.visibility(Visibilities.ALL)).toHaveProperty('filters', {
    visibility: Visibilities.ALL,
  });
});

it('can string all filterable options together', async () => {
  const resource = new TimeSlot(mockAxios);

  const expected = expect(
    resource
      .between('2018-01-01', '2018-01-31')
      .at(1)
      .attendedBy([1, 2])
      .for([1, 2])
      .by(1)
      .method(MeetingMethods.AT_LOCATION)
      .excluding(1)
      .supporting(['en'])
      .visibility(Visibilities.ALL)
      .withInviteOnly(),
  );

  expected.toHaveProperty('filters', {
    end: '2018-01-31',
    exclusion: 1,
    invite_only_resources: true,
    locales: ['en'],
    location: 1,
    method: MeetingMethods.AT_LOCATION,
    services: [1, 2],
    start: '2018-01-01',
    user: 1,
    users: [1, 2],
    visibility: Visibilities.ALL,
  });
});

it('can get time slots for no particular user', async () => {
  const resource = new TimeSlot(mockAxios);

  const timezones = ['America/Chicago', 'America/Toronto', 'Europe/Amsterdam', 'Europe/Paris'];
  const timezone = timezones[Math.floor(Math.random() * timezones.length)];

  await resource
    .between('2018-01-01', '2018-01-31')
    .at(1)
    .supporting(['fr', 'es'])
    .for([1, 2])
    .in(timezone)
    .excluding(1)
    .visibility(Visibilities.ALL)
    .withInviteOnly()
    .get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('times', {
    params: {
      end: '2018-01-31',
      exclusion: 1,
      invite_only_resources: 1,
      location_id: 1,
      service_id: [1, 2],
      start: '2018-01-01',
      supported_locales: ['fr', 'es'],
      timezone,
      visibility: Visibilities.ALL,
    },
  });
});

it('can get time slots for a specified user', async () => {
  const resource = new TimeSlot(mockAxios);

  const timezones = ['America/Chicago', 'America/Toronto', 'Europe/Amsterdam', 'Europe/Paris'];
  const timezone = timezones[Math.floor(Math.random() * timezones.length)];

  await resource
    .between('2018-01-01', '2018-01-31')
    .at(1)
    .for([1, 2])
    .supporting(['en', 'es'])
    .by(1)
    .in(timezone)
    .visibility(Visibilities.ALL)
    .get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('times', {
    params: {
      end: '2018-01-31',
      location_id: 1,
      service_id: [1, 2],
      staff_id: 1,
      start: '2018-01-01',
      supported_locales: ['en', 'es'],
      timezone,
      visibility: Visibilities.ALL,
    },
  });
});

it('can conditionally set a filter', async () => {
  const resource = new TimeSlot(mockAxios);

  const expected = expect(
    resource.when(true, (slot: TimeSlot) => slot.at(1)),
  );

  expected.toHaveProperty('filters', {
    location: 1,
  });
});

it('can conditionally not set a filter', async () => {
  const resource = new TimeSlot(mockAxios);

  const expected = expect(
    resource.when(false, (slot: TimeSlot) => slot.at(1)),
  );

  expected.toHaveProperty('filters', {});
});
