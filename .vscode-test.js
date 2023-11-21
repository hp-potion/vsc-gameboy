const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig([
  {
    label: 'Test on VSCode 1.80.2',
    version: '1.80.2',
    files: 'out/test/**/*.test.js',
  },
  {
    label: 'Test on VSCode 1.81.2',
    version: '1.81.1',
    files: 'out/test/**/*.test.js',
  },
  {
    label: 'Test on VSCode 1.82.2',
    version: '1.82.3',
    files: 'out/test/**/*.test.js',
  },
  {
    label: 'Test on VSCode 1.83.2',
    version: '1.83.1',
    files: 'out/test/**/*.test.js',
  },
  {
    label: 'Test on VSCode 1.84.2',
    version: '1.84.2',
    files: 'out/test/**/*.test.js',
  },
]);
