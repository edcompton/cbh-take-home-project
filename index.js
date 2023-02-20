const { deterministicPartitionKey } = require('./dpk');

console.log(deterministicPartitionKey({ key: 'value'.repeat(100) }));
console.log(deterministicPartitionKey({ key: 'value', bool: true, num: 123 }));
console.log(deterministicPartitionKey({ key: 'value' }));
