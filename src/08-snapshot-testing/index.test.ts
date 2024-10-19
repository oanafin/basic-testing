// Uncomment the code below and write your tests
import { generateLinkedList } from './index';
import { describe, test, expect } from '@jest/globals';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from array [1, 2, 3]', () => {
    const input = [1, 2, 3];
    const expectedOutput = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(generateLinkedList(input)).toStrictEqual(expectedOutput);
  });

  test('should generate linked list from array [4, 5, 6]', () => {
    const input = [4, 5, 6];
    const linkedList = generateLinkedList(input);

    expect(linkedList).toMatchSnapshot();
  });

  test('should generate an empty linked list from an empty array', () => {
    const input: number[] = [];
    const expectedOutput = {
      value: null,
      next: null,
    };

    expect(generateLinkedList(input)).toStrictEqual(expectedOutput);
  });
});
