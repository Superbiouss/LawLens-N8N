const browserGlobals = {
  AbortController: 'readonly',
  Blob: 'readonly',
  URL: 'readonly',
  clearTimeout: 'readonly',
  document: 'readonly',
  fetch: 'readonly',
  localStorage: 'readonly',
  navigator: 'readonly',
  sessionStorage: 'readonly',
  setTimeout: 'readonly',
  window: 'readonly',
};

const nodeGlobals = {
  process: 'readonly',
};

const testGlobals = {
  describe: 'readonly',
  expect: 'readonly',
  it: 'readonly',
};

const baseRules = {
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
};

export default [
  {
    ignores: ['coverage/**', 'dist/**', 'node_modules/**'],
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: browserGlobals,
    },
    rules: baseRules,
  },
  {
    files: ['*.js', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: nodeGlobals,
    },
    rules: baseRules,
  },
  {
    files: ['src/**/*.test.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...browserGlobals,
        ...nodeGlobals,
        ...testGlobals,
      },
    },
    rules: baseRules,
  },
];
