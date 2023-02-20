import { deterministicPartitionKey } from './dpk';
import crypto from 'crypto';

jest.mock('crypto');

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });

  it('Returns the same partition key when given an object with partitionKey property', () => {
    const event = { partitionKey: 'key1' };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe('key1');
  });

  it('Throws an error when given an object without partitionKey property', () => {
    const event = { key: 'value' };
    expect(() => deterministicPartitionKey(event)).toThrowError();
  });

  it('Returns a hash when given a non-string input', () => {
    const digestMock = jest.fn().mockReturnValue('mocked-hash');
    const updateMock = jest.fn().mockReturnThis();
    jest.spyOn(crypto, 'createHash').mockReturnValue({ update: updateMock, digest: digestMock });

    const event = { key: 'value', bool: true, num: 123 };
    const partitionKey = deterministicPartitionKey(event);

    expect(partitionKey).toBe('mocked-hash');
    expect(crypto.createHash).toHaveBeenCalledWith('sha3-512');
    expect(updateMock).toHaveBeenCalledWith(JSON.stringify(event));
    expect(digestMock).toHaveBeenCalledWith('hex');
  });

  it('Returns a hash with length <= 256 characters', () => {
    const digestMock = jest.fn().mockReturnValue('mocked-hash'.repeat(16));
    const updateMock = jest.fn().mockReturnThis();
    jest.spyOn(crypto, 'createHash').mockReturnValue({ update: updateMock, digest: digestMock });

    const event = { key: 'value'.repeat(100) };
    const partitionKey = deterministicPartitionKey(event);

    expect(partitionKey.length).toBeLessThanOrEqual(256);
    expect(crypto.createHash).toHaveBeenCalledWith('sha3-512');
    expect(updateMock).toHaveBeenCalledWith(JSON.stringify(event));
    expect(digestMock).toHaveBeenCalledWith('hex');
  });
});
