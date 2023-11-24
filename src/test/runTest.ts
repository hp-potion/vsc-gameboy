import * as path from 'path';

import { runTests } from '@vscode/test-electron';

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');

    // The path to test runner
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    // Download VS Code, unzip it and run the integration test
    // case 1 : How to test multiple versions using runTest function
    // script "test: node ./out/test/runTest.js" of package.json
    // await runTests({
    //   version: '1.80.2',
    //   extensionDevelopmentPath,
    //   extensionTestsPath,
    // });

    // case 2 : How to test multiple versions using .vscode-test.js.
    // script "test: vscode-test" of package.json
    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error('Failed to run tests', err);
    process.exit(1);
  }
}

main();
