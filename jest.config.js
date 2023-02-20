export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  // testEnvironment: 'jest-environment-node',
  verbose: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/dist_test/'],
};
