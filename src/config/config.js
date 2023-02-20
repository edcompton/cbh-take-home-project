const dotenv = require('dotenv');

dotenv.config();

const config = {
  trivialPartitionKey: process.env.TRIVIAL_PARTITION_KEY || 0,
  maxPartitionKeyLength: process.env.MAX_PARTITION_KEY_LENGTH || 256,
};
module.exports = config;
