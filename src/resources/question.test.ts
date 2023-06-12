import mockAxios from 'axios';

import Question from './question';
import User from './user';

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

it('will set the page we are on', async () => {
  const resource = new Question(mockAxios);

  expect(resource.on(4)).toHaveProperty('page', 4);
});

it('will set the limit given', async () => {
  const resource = new Question(mockAxios);

  expect(resource.take(5)).toHaveProperty('limit', 5);
});

it('will set the sortable filter', async () => {
  const resource = new Question(mockAxios);

  expect(resource.sortBy('name,-created')).toHaveProperty('sortable', 'name,-created');
});

it('can string all filterable options together', async () => {
  const resource = new Question(mockAxios);

  const expected = expect(
    resource
      .for(3)
      .sortBy('created')
      .take(5)
      .on(1),
  );

  expected.toHaveProperty('filters', {
    services: 3,
  });
  expected.toHaveProperty('sortable', 'created');
  expected.toHaveProperty('limit', 5);
  expected.toHaveProperty('page', 1);
});

it('can get questions without additional parameters', async () => {
  const resource = new Question(mockAxios);

  await resource.get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('questions', { params: {} });
});

it('can get questions with additional parameters', async () => {
  const resource = new Question(mockAxios);

  await resource
    .for(3)
    .sortBy('created')
    .take(5)
    .on(1)
    .get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('questions', {
    params: {
      'filter[matching]': 3,
      limit: 5,
      page: 1,
      sort: 'created',
    },
  });
});

it('can conditionally set a filter', async () => {
  const resource = new Question(mockAxios);

  const expected = expect(resource.when(true, (question: Question) => question.for(1)));

  expected.toHaveProperty('filters', {
    services: 1,
  });
});

it('can conditionally not set a filter', async () => {
  const resource = new Question(mockAxios);

  const expected = expect(resource.when(false, (question: Question) => question.for(1)));

  expected.toHaveProperty('filters', {});
});
