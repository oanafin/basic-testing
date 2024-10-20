// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test her
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 6, b: 4, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Multiply })).toBe(12);
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(9);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 4, action: Action })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(simpleCalculator({ a: NaN, b: 'a', action: Action.Add })).toBeNull();
  });
});
