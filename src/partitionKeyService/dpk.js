import crypto from 'crypto';
import config from '../config/config';

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

  const partitionKey = crypto.createHash('sha3-512').update(event).digest('hex');

  if (partitionKey.length > maxPartitionKeyLength) {
    return crypto.createHash('sha3-512').update(partitionKey).digest('hex');
  }

  return partitionKey;
}

export { deterministicPartitionKey };
