const nextJest = require('next/jest');

const babelConfigStyledComponents = {
  presets: [['next/babel', { 'preset-react': { runtime: 'automatic' } }]],
  plugins: [
    'babel-plugin-macros',
    ['babel-plugin-styled-components', { ssr: true }],
  ],
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
const customJestConfig = {
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,
    '^components/(.*)$': '<rootDir>/components/$1',
    '^containers/(.*)$': '<rootDir>/containers/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['babel-jest', babelConfigStyledComponents],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig(customJestConfig);
