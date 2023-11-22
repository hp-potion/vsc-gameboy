module.exports = {
  // other Jest configuration options...
  testMatch: [
    '**/__tests__/**/*.+(js|jsx|ts|tsx)', // Include .jsx, .js, .tsx, .ts files in __tests__ directories
    '**/?(*.)+(spec).+(js|jsx|ts|tsx)', // Include .jsx, .js, .tsx, .ts files with spec file only in the filename
  ],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/.vscode-test/'],
};
