module.exports = {
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: [
    '**/tests/**/*.spec.ts'
  ]
}