import mockAxios from 'axios';

import MeetingMethods from '../constants/meeting-methods';
import Origins from '../constants/origins';
import Answer from '../models/answer';
import Client from '../models/client';
import QueueAppointment from './queue-appointment';

it('can set the workflow property', async () => {
  const resource = new QueueAppointment(mockAxios);

  expect(resource.workflow(12)).toHaveProperty('filters', {
    workflow: 12,
  });
});

it('can set the booked through property', async () => {
  const resource = new QueueAppointment(mockAxios);

  expect(resource.through(Origins.API)).toHaveProperty('filters', {
    through: Origins.API,
  });
});

it('can set the meeting method property', async () => {
  const resource = new QueueAppointment(mockAxios);
  const { PHONE_CALL } = MeetingMethods;

  expect(resource.method(PHONE_CALL)).toHaveProperty('filters', {
    method: PHONE_CALL,
  });
});

it('can set the location property', async () => {
  const resource = new QueueAppointment(mockAxios);

  expect(resource.at(1)).toHaveProperty('filters', {
    location: 1,
  });
});

it('can set the service property using a single number', async () => {
  const resource = new QueueAppointment(mockAxios);

  expect(resource.for(1)).toHaveProperty('filters', {
    service: 1,
  });
});

it('can set the campaign property', async () => {
  const resource = new QueueAppointment(mockAxios);

  expect(resource.campaign('test campaign')).toHaveProperty('utm', {
    campaign: 'test campaign',
  });
});

it('can set the content property', async () => {
  const resource = new QueueAppointment(mockAxios);

  expect(resource.content('test content')).toHaveProperty('utm', {
    content: 'test content',
  });
});

it('can set the medium property', async () => {
  const resource = new QueueAppointment(mockAxios);

  expect(resource.medium('test medium')).toHaveProperty('utm', {
    medium: 'test medium',
  });
});

it('can set the source property', async () => {
  const resource = new QueueAppointment(mockAxios);

  expect(resource.source('test source')).toHaveProperty('utm', {
    source: 'test source',
  });
});

it('can set the term property', async () => {
  const resource = new QueueAppointment(mockAxios);

  expect(resource.term('test term')).toHaveProperty('utm', {
    term: 'test term',
  });
});

it('can set a client for the queue appointment', async () => {
  const resource = new QueueAppointment(mockAxios);
  const client = new Client();

  expect(resource.with(client)).toHaveProperty('relationships', {
    client: {
      data: client,
    },
  });
});

it('can book a queue appointment with the minimum required parameters', async () => {
  const resource = new QueueAppointment(mockAxios);
  const client = new Client();

  await resource
    .at(1)
    .for(2)
    .method(1)
    .with(client.named('Jane', 'Doe'))
    .book();

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('queue-appointments', {
    data: {
      attributes: {
        location_id: 1,
        service_id: 2,
        meeting_method: 1,
      },
      relationships: {
        client: {
          data: {
            attributes: {
              first_name: 'Jane',
              last_name: 'Doe',
              receive_sms: false,
            },
            type: 'client',
          },
        },
      },
      type: 'queue-appointments',
    },
  });
});

it('can book a queue appointment with all available parameters', async () => {
  const resource = new QueueAppointment(mockAxios);
  const client = new Client()
    .alias('EFG-456')
    .answers(new Answer().for(1).is('this answer'))
    .named('Jane', 'Doe')
    .messagable()
    .provided('testing notes')
    .reachable({
      email: 'test@example.com',
      cell_phone: '1-555-555-5555',
    })
    .speaks('fr');

  await resource
    .at(1)
    .for(2)
    .method(1)
    .through(Origins.MODERN_CLIENT_VIEW)
    .provided('notes')
    .workflow(12)
    .campaign('test campaign')
    .content('test content')
    .medium('test medium')
    .source('test source')
    .term('test term')
    .preferredLanguage('en')
    .language('fr')
    .preferredStaff(1)
    .with(client)
    .book();

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('queue-appointments', {
    data: {
      attributes: {
        location_id: 1,
        service_id: 2,
        meeting_method: 1,
        workflow_id: 12,
        preferred_lang: 'en',
        preferred_staff_id: 1,
        notes: 'notes',
        booked_through: Origins.MODERN_CLIENT_VIEW,
        campaign: 'test campaign',
        content: 'test content',
        medium: 'test medium',
        source: 'test source',
        term: 'test term',
      },
      relationships: {
        client: {
          data: {
            attributes: {
              external_id: 'EFG-456',
              first_name: 'Jane',
              last_name: 'Doe',
              cell_phone: '1-555-555-5555',
              email: 'test@example.com',
              lang: 'fr',
              notes: 'testing notes',
              receive_sms: true,
            },
            type: 'client',
            relationships: {
              answers: {
                data: [
                  {
                    attributes: {
                      question_id: 1,
                      value: 'this answer',
                    },
                    type: 'answers',
                  },
                ],
              },
            },
          },
        },
      },
      type: 'queue-appointments',
    },
  });
});

it('can book a queue appointment with all available parameters except preferred staff', async () => {
  const resource = new QueueAppointment(mockAxios);
  const client = new Client()
    .alias('EFG-456')
    .answers(new Answer().for(1).is('this answer'))
    .named('Jane', 'Doe')
    .messagable()
    .provided('testing notes')
    .reachable({
      email: 'test@example.com',
      cell_phone: '1-555-555-5555',
    })
    .speaks('fr');

  await resource
    .at(1)
    .for(2)
    .method(1)
    .through(Origins.MODERN_CLIENT_VIEW)
    .provided('notes')
    .workflow(12)
    .campaign('test campaign')
    .content('test content')
    .medium('test medium')
    .source('test source')
    .term('test term')
    .with(client)
    .book();

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('queue-appointments', {
    data: {
      attributes: {
        location_id: 1,
        service_id: 2,
        meeting_method: 1,
        workflow_id: 12,
        notes: 'notes',
        booked_through: Origins.MODERN_CLIENT_VIEW,
        campaign: 'test campaign',
        content: 'test content',
        medium: 'test medium',
        source: 'test source',
        term: 'test term',
      },
      relationships: {
        client: {
          data: {
            attributes: {
              external_id: 'EFG-456',
              first_name: 'Jane',
              last_name: 'Doe',
              cell_phone: '1-555-555-5555',
              email: 'test@example.com',
              lang: 'fr',
              notes: 'testing notes',
              receive_sms: true,
            },
            type: 'client',
            relationships: {
              answers: {
                data: [
                  {
                    attributes: {
                      question_id: 1,
                      value: 'this answer',
                    },
                    type: 'answers',
                  },
                ],
              },
            },
          },
        },
      },
      type: 'queue-appointments',
    },
  });
});

it('can book a queue appointment with preferred language only', async () => {
  const resource = new QueueAppointment(mockAxios);
  const client = new Client();

  await resource
    .at(1)
    .for(2)
    .method(1)
    .preferredLanguage('en')
    .with(client.named('Jane', 'Doe'))
    .book();

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('queue-appointments', {
    data: expect.objectContaining({
      attributes: expect.objectContaining({
        preferred_lang: 'en',
      }),
      type: 'queue-appointments',
    }),
  });
});

it('can book a queue appointment with preferred staff id only', async () => {
  const resource = new QueueAppointment(mockAxios);
  const client = new Client();

  await resource
    .at(1)
    .for(2)
    .method(1)
    .preferredStaff(123)
    .with(client.named('Jane', 'Doe'))
    .book();

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('queue-appointments', {
    data: expect.objectContaining({
      attributes: expect.objectContaining({
        preferred_staff_id: 123,
      }),
      type: 'queue-appointments',
    }),
  });
});

it('can conditionally set a filter', async () => {
  const resource = new QueueAppointment(mockAxios);

  const expected = expect(resource.when(true, (queueAppointment: QueueAppointment) => queueAppointment.for(1)));

  expected.toHaveProperty('filters', {
    service: 1,
  });
});

it('can conditionally not set a filter', async () => {
  const resource = new QueueAppointment(mockAxios);

  const expected = expect(resource.when(false, (queueAppointment: QueueAppointment) => queueAppointment.for(1)));

  expected.toHaveProperty('filters', {});
});
