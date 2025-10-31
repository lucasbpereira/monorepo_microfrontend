module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/test.ts'
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|@angular|rxjs)'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage/jest',
  coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
  testMatch: [
    '**/+(*.)+(spec).+(ts)'
  ],
  moduleFileExtensions: ['ts', 'js', 'html'],
  testEnvironment: 'jsdom',
  setupFiles: ['jest-localstorage-mock']
};