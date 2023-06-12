import Answer from './answer';
import Attendee from './attendee';
import Response from './response';

it('can set an identifier for the attendee', async () => {
  const attendee = new Attendee();

  expect(attendee.as(1).getAttributes()).toEqual(
    expect.objectContaining({
      identifier: 1,
    }),
  );
});

it('can set an external identifier for the attendee', async () => {
  const attendee = new Attendee();

  expect(attendee.alias('ABC-123').getAttributes()).toEqual(
    expect.objectContaining({
      alias: 'ABC-123',
    }),
  );
});

it('can set answers when providing a single answer', async () => {
  const answer = new Answer();
  const attendee = new Attendee();

  expect(attendee.answers(answer).getAttributes()).toEqual(
    expect.objectContaining({
      answers: [answer],
    }),
  );
});

it('can set answers when providing multiple answers', async () => {
  const answer = new Answer();
  const attendee = new Attendee();

  expect(attendee.answers([answer, answer]).getAttributes()).toEqual(
    expect.objectContaining({
      answers: [answer, answer],
    }),
  );
});

it('can set responses when providing a single response', async () => {
  const response = new Response();
  const attendee = new Attendee();

  expect(attendee.responses(response).getAttributes()).toEqual(
    expect.objectContaining({
      responses: [response],
    }),
  );
});

it('can set responses when providing multiple responses', async () => {
  const response = new Response();
  const attendee = new Attendee();

  expect(attendee.responses([response, response]).getAttributes()).toEqual(
    expect.objectContaining({
      responses: [response, response],
    }),
  );
});

it('can set location detail parameters and maintain existing attributes', async () => {
  const attendee = new Attendee();
  const details = {
    address: '123 Fake St',
    city: 'Fake City',
    country: 'FC',
    postcode: 'X0X 0X0',
    region: 'FR',
    timezone: 'UTC',
  };

  expect(attendee.located(details).getAttributes()).toEqual(
    expect.objectContaining({
      ...attendee.getAttributes(),
      ...details,
    }),
  );
});

it('can set that an attendee is messagable', async () => {
  const attendee = new Attendee();

  expect(attendee.messagable().getAttributes()).toEqual(
    expect.objectContaining({
      messagable: true,
    }),
  );
});

it('can set that an attendee is not messagable', async () => {
  const attendee = new Attendee();

  expect(attendee.messagable(false).getAttributes()).toEqual(
    expect.objectContaining({
      messagable: false,
    }),
  );
});

it('can set an attendees first and last name', async () => {
  const attendee = new Attendee();

  expect(attendee.named('Jane', 'Doe').getAttributes()).toEqual(
    expect.objectContaining({
      first_name: 'Jane',
      last_name: 'Doe',
    }),
  );
});

it('can set any additional notes an attendee provides', async () => {
  const attendee = new Attendee();

  expect(attendee.provided('notes').getAttributes()).toEqual(
    expect.objectContaining({
      notes: 'notes',
    }),
  );
});

it('can set the reachable details and maintain existing attributes', async () => {
  const attendee = new Attendee();
  const details = {
    cell_phone: '5555555555',
    email: 'jane@doe.com',
    phone: '5555555555',
    work_phone: '5555555555',
  };

  expect(attendee.reachable(details).getAttributes()).toEqual(
    expect.objectContaining({
      ...attendee.getAttributes(),
      ...details,
    }),
  );
});

it('can set the language of the attendee', async () => {
  const attendee = new Attendee();

  expect(attendee.speaks('es').getAttributes()).toEqual(
    expect.objectContaining({
      language: 'es',
    }),
  );
});
