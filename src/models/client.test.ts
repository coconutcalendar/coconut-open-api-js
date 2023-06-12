import Answer from './answer';
import Client from './client';

it('can set answers when providing a single answer', async () => {
  const answer = new Answer();
  const client = new Client();

  expect(client.answers(answer).getAttributes()).toEqual(
    expect.objectContaining({
      answers: [answer],
    }),
  );
});

it('can set answers when providing multiple answers', async () => {
  const answer = new Answer();
  const client = new Client();

  expect(client.answers([answer, answer]).getAttributes()).toEqual(
    expect.objectContaining({
      answers: [answer, answer],
    }),
  );
});

it('can set that a client is messagable', async () => {
  const client = new Client();

  expect(client.messagable().getAttributes()).toEqual(
    expect.objectContaining({
      receive_sms: true,
    }),
  );
});

it('can set that a client is not messagable', async () => {
  const client = new Client();

  expect(client.messagable(false).getAttributes()).toEqual(
    expect.objectContaining({
      receive_sms: false,
    }),
  );
});

it('can set a clients first and last name', async () => {
  const client = new Client();

  expect(client.named('Jane', 'Doe').getAttributes()).toEqual(
    expect.objectContaining({
      first_name: 'Jane',
      last_name: 'Doe',
    }),
  );
});

it('can set any additional notes a client provides', async () => {
  const client = new Client();

  expect(client.provided('notes').getAttributes()).toEqual(
    expect.objectContaining({
      notes: 'notes',
    }),
  );
});

it('can set the reachable details and maintain existing attributes', async () => {
  const client = new Client();
  const details = {
    cell_phone: '5555555555',
    email: 'jane@doe.com',
    phone: '5555555555',
    work_phone: '5555555555',
  };

  expect(client.reachable(details).getAttributes()).toEqual(
    expect.objectContaining({
      ...client.getAttributes(),
      ...details,
    }),
  );
});

it('can set the language of the client', async () => {
  const client = new Client();

  expect(client.speaks('es').getAttributes()).toEqual(
    expect.objectContaining({
      lang: 'es',
    }),
  );
});
