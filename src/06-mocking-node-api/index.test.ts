import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import fs from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toBeCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.advanceTimersByTime(500);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toBeCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);

    jest.advanceTimersByTime(1500);
    expect(callback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const testFilePath = path.join(__dirname, 'test.txt');

  beforeAll(async () => {
    await fs.writeFile(testFilePath, 'Hello, World!');
  });

  afterAll(async () => {
    await fs.unlink(testFilePath);
  });

  test('should return null if file does not exist', async () => {
    const nonExistentFile = 'non-existent-file.txt';
    const result = await readFileAsynchronously(nonExistentFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const result = await readFileAsynchronously('test.txt');
    expect(result).toBe('Hello, World!');
  });
});
