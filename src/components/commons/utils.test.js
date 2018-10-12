const capitalize = require('./utils').capitalize

test('Capitalize "hello" should equal "Hello"', () => {
  expect(capitalize('hello')).toBe('Hello')
});
