// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    // Write your test here
    const value = 10;
    await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    const errorMessage = 'This is error!';
    expect(() => throwError(errorMessage)).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    const defaultErrorMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultErrorMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    await expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
