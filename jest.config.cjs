/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@sections/(.*)$': '<rootDir>/src/sections/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1'
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json'
      }
    ]
  },
};
