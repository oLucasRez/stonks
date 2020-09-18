import { sum } from '../index';

test('it should sum two numbers', () => {
  const soma = sum(10, 2);

  expect(soma).toBe(12);
});
