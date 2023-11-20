import * as vscode from 'vscode';
import path from 'path';
import fs from 'fs';

// Game score generation function for local scoreboard(Use globalStorage)
function saveScore(
  context: vscode.ExtensionContext,
  gameId: string,
  scoreData: { player: string; score: number }
) {
  // Create full path to file to save
  const scoresPath = path.join(
    context.globalStorageUri.fsPath,
    `${gameId}-scores.json`
  );
  const directoryPath = path.dirname(scoresPath);

  //Directory verification and creation functions
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
  let scores: { player: string; score: number }[] = [];

  // Check if file exists
  if (fs.existsSync(scoresPath)) {
    // If the file exists, the file is returned in json format.
    scores = JSON.parse(fs.readFileSync(scoresPath, 'utf8'));
  }

  // Add scores
  scores.push(scoreData);

  // If the file does not exist, a new file is created, and if it exists, the contents are updated.
  fs.writeFileSync(scoresPath, JSON.stringify(scores, null, 2)); // Add formatting
}

export default saveScore;
