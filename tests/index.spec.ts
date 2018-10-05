import { foo } from '../src';

it('should exist', () => {
  expect(foo).toBeDefined;
});

it('should be bar', () => {
  expect(foo).toBe('bar');
});
