import crypto from 'crypto';
import config from '../config/config';

function createHashDigest(value) {
  return crypto.createHash('sha3-512').update(value).digest('hex');
}

function deterministicPartitionKey(event) {
  const { trivialPartitionKey, maxPartitionKeyLength } = config;

  if (!event) {
    return trivialPartitionKey;
  }

  if (event.partitionKey) {
    return event.partitionKey;
  }

  if (typeof event !== 'string') {
    event = JSON.stringify(event);
  }

  const partitionKey = createHashDigest(event);

  if (partitionKey.length > maxPartitionKeyLength) {
    return createHashDigest(partitionKey);
  }

  return partitionKey;
}

export { deterministicPartitionKey };
