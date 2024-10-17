// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = getBankAccount(1000);
    expect(() => account.withdraw(1100)).toThrowError(
      new InsufficientFundsError(1000),
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const account1 = getBankAccount(1000);
    const account2 = getBankAccount(1100);
    expect(() => account1.transfer(1100, account2)).toThrowError(
      new InsufficientFundsError(1000),
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = getBankAccount(1000);
    expect(() => account.transfer(1000, account)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(1000);
    account.deposit(1000);
    expect(account.getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(1000);
    account.withdraw(500);
    expect(account.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    // Write your test here
    const account1 = getBankAccount(1000);
    const account2 = getBankAccount(1100);
    account1.transfer(500, account2);
    expect(account1.getBalance()).toBe(500);
    expect(account2.getBalance()).toBe(1600);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const account = getBankAccount(1000);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const account = getBankAccount(500);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(1000);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const account = getBankAccount(500);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
