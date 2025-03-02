module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts'],
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  moduleDirectories: ['node_modules', 'src'],
  coverageDirectory: './coverage'
};
