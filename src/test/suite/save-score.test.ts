import * as assert from 'assert';
import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import saveScore from '../../util/save-score';

suite('Save Score Unit Test', () => {
  // Create a mock context
  const mockGameId = 'test-game';
  const mockScoreData = { player: 'Player1', score: 100 };
  const mockContext = {
    globalStorageUri: vscode.Uri.file(path.join(__dirname, 'mockStorage')),
  } as vscode.ExtensionContext;

  // Verify the file path
  const scoresPath = path.join(
    mockContext.globalStorageUri.fsPath,
    `${mockGameId}-scores.json`
  );

  test('Save Score Functionality Test', async () => {
    // Execute the function
    saveScore(mockContext, mockGameId, mockScoreData);

    // Check Existence
    assert.ok(
      fs.existsSync(scoresPath),
      'The saved score file does not exist.'
    );

    // Validate Content
    const savedData = JSON.parse(fs.readFileSync(scoresPath, 'utf8'));
    assert.ok(
      Array.isArray(savedData),
      'The saved data is not in array format.'
    );
    assert.strictEqual(
      savedData.length,
      1,
      'The length of saved data is not as expected.'
    );
    assert.deepStrictEqual(
      savedData[0],
      mockScoreData,
      'The saved data does not match the input data.'
    );

    // Clean up the file
    fs.unlinkSync(scoresPath);
    fs.rmdirSync(path.dirname(scoresPath));
  });
});
