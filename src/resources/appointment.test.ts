import mockAxios from 'axios';

import MeetingMethods from "../constants/meeting-methods";
import Notifications from '../constants/notifications';
import Origins from "../constants/origins";
import Answer from '../models/answer';
import Attendee from '../models/attendee';
import Response from '../models/response';
import Appointment, {AppointmentMatcherParameters, AppointmentNotificationParameters} from './appointment';

it('can set the workflow property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.workflow(12)).toHaveProperty('filters', {
    workflow: 12,
  });
})

it('can set the invitation property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.via(1)).toHaveProperty('filters', {
    invitation: 1,
  });
});

it('can set the booked through property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.through(Origins.API)).toHaveProperty('filters', {
    through: Origins.API,
  });
})

it('will set the invite only resources property to true by default', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.withInviteOnly()).toHaveProperty('filters', {
    invite_only_resources: true,
  });
});

it('can set the invite only resources property to false', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.withInviteOnly(false)).toHaveProperty('filters', {
    invite_only_resources: false,
  });
});

it('can set the location property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.at(1)).toHaveProperty('filters', {
    location: 1,
  });
});

it('can set the user property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.by(1)).toHaveProperty('filters', {
    user: 1,
  });
});

it('can set the user category property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.withinUserCategory(1)).toHaveProperty('filters', {
    user_category: 1,
  });
});

it('can set the users property using a number', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.attendedBy(1)).toHaveProperty('filters', {
    users: 1,
  });
});

it('can set the users property using an array of numbers', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.attendedBy([1, 2])).toHaveProperty('filters', {
    users: [1, 2],
  });
});

it('can set the meeting method property', async () => {
  const resource = new Appointment(mockAxios);
  const { PHONE_CALL } = MeetingMethods;

  expect(resource.method(PHONE_CALL)).toHaveProperty('filters', {
    method: PHONE_CALL,
  });
});

it('can set the service property using a single number', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.for(1)).toHaveProperty('filters', {
    services: 1,
  });
});

it('can set the service property using a multiple numbers', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.for([1, 2])).toHaveProperty('filters', {
    services: [1, 2],
  });
});

it('can set the campaign property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.campaign('test campaign')).toHaveProperty('utm', {
    campaign: 'test campaign',
  });
});

it('can set the content property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.content('test content')).toHaveProperty('utm', {
    content: 'test content',
  });
});

it('can set the medium property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.medium('test medium')).toHaveProperty('utm', {
    medium: 'test medium',
  });
});

it('can set the source property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.source('test source')).toHaveProperty('utm', {
    source: 'test source',
  });
});

it('can set the term property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.term('test term')).toHaveProperty('utm', {
    term: 'test term',
  });
});

it('can set the notifications property', async () => {
  const resource = new Appointment(mockAxios);
  const notifications: AppointmentNotificationParameters = {
    client: true,
    user: true,
  };

  expect(resource.notify(notifications)).toHaveProperty('filters', {
    notifications,
  });
});

it('can set a supported locale property', async () => {
  const resource = new Appointment(mockAxios);
  const locale = 'fr';

  expect(resource.supporting(locale)).toHaveProperty('filters', {
    locale,
  });
});

it('can set a timezone property', async () => {
  const resource = new Appointment(mockAxios);
  const timezone = 'America/Toronto';

  expect(resource.in(timezone)).toHaveProperty('filters', {
    timezone,
  });
});

it('can set the starting time property', async () => {
  const resource = new Appointment(mockAxios);
  const start = '2018-01-01 12:00:00';

  expect(resource.starting(start)).toHaveProperty('filters', {
    start,
  });
});

it('can set a booking shortcut property', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.shortcut(1)).toHaveProperty('filters', {
    shortcut: 1,
  });
});

it('can set a single attendee for the appointment', async () => {
  const resource = new Appointment(mockAxios);
  const attendee = new Attendee();

  expect(resource.with(attendee)).toHaveProperty('relationships', {
    attendees: [attendee],
  });
});

it('can set multiple attendees for the appointment', async () => {
  const resource = new Appointment(mockAxios);
  const attendee = new Attendee();

  expect(resource.with([attendee, attendee])).toHaveProperty('relationships', {
    attendees: [attendee, attendee],
  });
});

it('will set the skip meeting link generation property to true by default', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.withoutMeetingLink()).toHaveProperty('filters', {
    skip_meeting_link_generation: true,
  });
});

it('can set the skip meeting link generation property to false', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.withoutMeetingLink(false)).toHaveProperty('filters', {
    skip_meeting_link_generation: false,
  });
});

it('can set an identifier for who we are acting as when booking the appointment', async () => {
  const resource = new Appointment(mockAxios);

  expect(resource.actingAs(10)).toHaveProperty('meta', {
    booker: 10,
  });
});

it('can book an appointment with the minimum required parameters', async () => {
  const resource = new Appointment(mockAxios);
  const start = '2018-01-01 12:00:00';
  const attendee = new Attendee();

  await resource
    .at(1)
    .for(2)
    .starting(start)
    .with(attendee.named('Jane', 'Doe').reachable({ email: 'jane@doe.com' }))
    .book();

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('appointments', {
    data: {
      attributes: {
        invitation_id: null,
        location_id: 1,
        service_id: 2,
        staff_id: null,
        start,
        supported_locale: null,
      },
      relationships: {
        attendees: {
          data: [
            {
              attributes: {
                email: 'jane@doe.com',
                first_name: 'Jane',
                last_name: 'Doe',
              },
              type: 'attendees',
            },
          ],
        },
      },
      type: 'appointments',
    },
  });
});

it('can book an appointment with all available parameters', async () => {
  const resource = new Appointment(mockAxios);
  const start = '2018-01-01 12:00:00';
  const attendee = new Attendee();
  const answer = new Answer();
  const { PHONE_CALL } = MeetingMethods;
  const notifications = [Notifications.CLIENT, Notifications.USER, Notifications.ALL];

  for (const notification of notifications) {
    await resource
      .at(1)
      .attendedBy([1, 2])
      .for([2, 3])
      .by(4)
      .via(5)
      .shortcut(6)
      .starting(start)
      .method(PHONE_CALL)
      .in('America/Toronto')
      .supporting('fr')
      .through(Origins.MODERN_CLIENT_VIEW)
      .campaign('test campaign')
      .content('test content')
      .medium('test medium')
      .source('test source')
      .term('test term')
      .actingAs(10)
      .withInviteOnly()
      .withinUserCategory(1)
      .withoutMeetingLink()
      .with(
        attendee
          .alias('ABC-123')
          .named('Jane', 'Doe')
          .reachable({
            cell_phone: '5555555555',
            email: 'jane@doe.com',
            phone: '5555555555',
            work_phone: '5555555555',
          })
          .located({
            address: '123 Fake St',
            city: 'Fake City',
            country: 'FC',
            postcode: 'X0X 0X0',
            region: 'FR',
            timezone: 'UTC',
          })
          .messagable()
          .provided('notes')
          .speaks('es')
          .answers(answer.for(1).is('this answer')),
      )
    .notify(notification)
    .book();

    expect(mockAxios.post).toHaveBeenCalledWith('appointments', {
      data: {
        attributes: {
          additional_staff_id: [1, 2],
          booked_through: Origins.MODERN_CLIENT_VIEW,
          booking_shortcut_id: 6,
          invitation_id: 5,
          invite_only_resources: 1,
          location_id: 1,
          meeting_method: PHONE_CALL,
          service_id: [2, 3],
          staff_category_id: 1,
          staff_id: 4,
          start,
          supported_locale: 'fr',
          timezone: 'America/Toronto',
        },
        relationships: {
          attendees: {
            data: [
              {
                attributes: {
                  address: '123 Fake St',
                  cell_phone: '5555555555',
                  city: 'Fake City',
                  country: 'FC',
                  email: 'jane@doe.com',
                  external_id: 'ABC-123',
                  first_name: 'Jane',
                  lang: 'es',
                  last_name: 'Doe',
                  notes: 'notes',
                  phone: '5555555555',
                  prov_state: 'FR',
                  receive_sms: true,
                  timezone: 'UTC',
                  work_phone: '5555555555',
                  zip_postal: 'X0X 0X0',
                },
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
                type: 'attendees',
              },
            ],
          },
        },
        type: 'appointments',
      },
      meta: {
        booker: 10,
        notify: notification,
        skip_meeting_link_generation: true,
        utm: {
          campaign: 'test campaign',
          content: 'test content',
          medium: 'test medium',
          source: 'test source',
          term: 'test term',
        },
      },
    });
  }

  expect(mockAxios.post).toHaveBeenCalledTimes(3);
});

it('can add the given attendee to the given appointment', async () => {
  const resource = new Appointment(mockAxios);
  const attendee = (new Attendee()).named('Jane', 'Doe').reachable({ email: 'jane@doe.com' });

  await resource.with(attendee).actingAs(10).add(1);

  expect(mockAxios.put).toHaveBeenCalledTimes(1);
  expect(mockAxios.put).toHaveBeenCalledWith('appointments/1/attendees', {
    data: [
      {
        attributes: {
          email: 'jane@doe.com',
          first_name: 'Jane',
          last_name: 'Doe',
        },
        type: 'attendees',
      }
    ],
    meta: {
      booker: 10,
    },
  }, {
    headers: {
      'Content-Type': 'application/json; ext=bulk',
    },
  });
});

it('can add the given attendee to the given appointment with notification meta data', async () => {
  const resource = new Appointment(mockAxios);
  const attendee = (new Attendee()).named('Jane', 'Doe').reachable({ email: 'jane@doe.com' });

  await resource.with(attendee).notify(Notifications.ALL).add(1);

  expect(mockAxios.put).toHaveBeenCalledTimes(1);
  expect(mockAxios.put).toHaveBeenCalledWith('appointments/1/attendees', {
    data: [
      {
        attributes: {
          email: 'jane@doe.com',
          first_name: 'Jane',
          last_name: 'Doe',
        },
        type: 'attendees',
      }
    ],
    meta: {
      notify: {
        client: true,
        user: true,
      },
    },
  }, {
    headers: {
      'Content-Type': 'application/json; ext=bulk',
    },
  });
});

it('can add the given attendee to the given appointment with booked through meta data', async () => {
  const resource = new Appointment(mockAxios);
  const attendee = (new Attendee()).named('Jane', 'Doe').reachable({ email: 'jane@doe.com' });

  await resource.with(attendee).through(Origins.MODERN_CLIENT_VIEW).add(1);

  expect(mockAxios.put).toHaveBeenCalledTimes(1);
  expect(mockAxios.put).toHaveBeenCalledWith('appointments/1/attendees', {
    data: [
      {
        attributes: {
          email: 'jane@doe.com',
          first_name: 'Jane',
          last_name: 'Doe',
        },
        type: 'attendees',
      }
    ],
    meta: {
      origin: Origins.MODERN_CLIENT_VIEW,
    },
  }, {
    headers: {
      'Content-Type': 'application/json; ext=bulk',
    },
  });
});

it('can add the given attendee to the given appointment while supplying answers', async () => {
  const resource = new Appointment(mockAxios);
  const answer = (new Answer()).for(1).is('the value');
  const attendee = (new Attendee())
      .named('Jane', 'Doe')
      .reachable({ email: 'jane@doe.com' })
      .answers(answer);

  await resource.with(attendee).add(1);

  expect(mockAxios.put).toHaveBeenCalledTimes(1);
  expect(mockAxios.put).toHaveBeenCalledWith('appointments/1/attendees', {
    data: [
      {
        attributes: {
          email: 'jane@doe.com',
          first_name: 'Jane',
          last_name: 'Doe',
        },
        relationships: {
          answers: {
            data: [
              {
                attributes: {
                  question_id: 1,
                  value: 'the value',
                },
                type: 'answers',
              }
            ]
          }
        },
        type: 'attendees'
      }
    ],
  }, {
    headers: {
      'Content-Type': 'application/json; ext=bulk',
    },
  });
});

it('can retrieve matching appointments using a given set of matchers', async () => {
  const resource = new Appointment(mockAxios);
  const matchers: AppointmentMatcherParameters = {
    code: 'A9B8C7D6E5F4G3H2',
    id: 1,
  };

  await resource.matching(matchers).get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('appointments', {
    params: matchers,
  });
});

it('can cancel the given appointment for the given attendee', async () => {
  const resource = new Appointment(mockAxios);

  await resource.cancel(1, 2, 'code');

  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  expect(mockAxios.delete).toHaveBeenCalledWith('appointments/1/2', { data: {}, params: { code: 'code' } });
});

it('can cancel the given appointment for the given attendee while provided responses', async () => {
  const resource = new Appointment(mockAxios);
  const attendee = new Attendee();
  const responses = [
    (new Response()).for(1).is('the response'),
    (new Response()).for(2).selected(1),
  ];

  await resource
    .with(
      attendee.as(2).responses(responses)
    )
    .cancel(1, 2, 'code');

  expect(mockAxios.delete).toHaveBeenCalledWith('appointments/1/2', {
    data: {
      data: {
        relationships: {
          attendees: {
            data: [
              {
                id: 2,
                relationships: {
                  responses: {
                    data: [
                      {
                        attributes: {
                          form_question_id: 1,
                          value: 'the response',
                        },
                        type: 'responses',
                      },
                      {
                        attributes: {
                          form_option_id: 1,
                          form_question_id: 2,
                        },
                        type: 'responses',
                      },
                    ]
                  }
                },
                type: 'attendees',
              }
            ]
          }
        },
        type: 'appointments',
      },
    },
    params: {
      code: 'code',
    },
  });
});

it('can conditionally set a filter', async () => {
  const resource = new Appointment(mockAxios);

  const expected = expect(
    resource.when(true, (appointment: Appointment) => appointment.at(1)),
  );

  expected.toHaveProperty('filters', {
    location: 1,
  });
});

it('can conditionally not set a filter', async () => {
  const resource = new Appointment(mockAxios);

  const expected = expect(
    resource.when(false, (appointment: Appointment) => appointment.at(1)),
  );

  expected.toHaveProperty('filters', {});
});

it('can reschedule an appointment with the minimum required parameters', async () => {
  const resource = new Appointment(mockAxios);
  const start = '2018-01-01 12:00:00';

  await resource
    .starting(start)
    .reschedule(1, 'code');

  expect(mockAxios.patch).toHaveBeenCalledTimes(1);
  expect(mockAxios.patch).toHaveBeenCalledWith('appointments/1?code=code', {
    data: {
      attributes: {
        start,
      },
      id: 1,
      type: 'appointments',
    }
  });
});

it('can reschedule an appointment with all available parameters', async () => {
  const resource = new Appointment(mockAxios);
  const start = '2018-01-01 12:00:00';
  const notifications = [Notifications.CLIENT, Notifications.USER, Notifications.ALL];

  for (const notification of notifications) {
    await resource
      .starting(start)
      .in('America/Toronto')
      .notify(notification)
      .withoutMeetingLink()
      .reschedule(1, 'code');

    expect(mockAxios.patch).toHaveBeenCalledWith('appointments/1?code=code', {
      data: {
        attributes: {
          start,
          timezone: 'America/Toronto',
        },
        id: 1,
        type: 'appointments',
      },
      meta: {
        notify: notification,
        skip_meeting_link_generation: true,
      },
    });
  }

  expect(mockAxios.patch).toHaveBeenCalledTimes(3);
});

it('can book an appointment with a file upload', async () => {
  const resource = new Appointment(mockAxios);
  const start = '2022-06-20 12:00:00';
  const attendee = new Attendee();
  const uploadedFile = {
    key: '0afbdaab-cdaa-44ae-b28b-110b1d77d9fa',
    file: new File(['image'], 'image.png', { type: 'image/png' }),
  };
  const formData = new FormData();

  formData.append('data', JSON.stringify({
    data: {
      relationships: {
        attendees: {
          data: [
            {
              type: 'attendees',
              attributes: {
                email: 'jane@doe.com',
                first_name: 'Jane',
                last_name: 'Doe',
              },
            },
          ],
        },
      },
      type: 'appointments',
      attributes: {
        invitation_id: null,
        location_id: 1,
        service_id: 2,
        staff_id: null,
        start,
        supported_locale: null,
      },
    },
  }));
  formData.append(uploadedFile.key, uploadedFile.file);

  await resource
    .at(1)
    .for(2)
    .starting(start)
    .with(attendee.named('Jane', 'Doe').reachable({ email: 'jane@doe.com' }))
    .uploads([uploadedFile])
    .book();

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('appointments', formData);
});

it('can add the given attendee to the given appointment with a file upload', async () => {
  const resource = new Appointment(mockAxios);
  const attendee = (new Attendee()).named('Jane', 'Doe').reachable({ email: 'jane@doe.com' });
  const uploadedFile = {
    key: '0afbdaab-cdaa-44ae-b28b-110b1d77d9fa',
    file: new File(['image'], 'image.png', { type: 'image/png' }),
  };
  const formData = new FormData();

  formData.append('contentType', 'application/json; ext=bulk');
  formData.append('data', JSON.stringify({
    data: [
      {
        type: 'attendees',
        attributes: {
          email: 'jane@doe.com',
          first_name: 'Jane',
          last_name: 'Doe',
        },
      }
    ],
    meta: {
      booker: 10,
    },
  }));
  formData.append(uploadedFile.key, uploadedFile.file);
  formData.append('_method', 'PUT');

  await resource.with(attendee).uploads([uploadedFile]).actingAs(10).add(1);

  expect(mockAxios.put).toHaveBeenCalledTimes(0);
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith('appointments/1/attendees', formData);
});
