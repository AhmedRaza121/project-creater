module.exports = {
  'roots': [
    '<rootDir>/tsSrc'
  ],
  'testMatch': [
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  'testEnvironment': 'jsdom',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ]
};

