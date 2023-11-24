import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface Score {
  player: string;
  score: number;
}

export class ScoreBoardProvider implements vscode.TreeDataProvider<ScoreItem> {
  constructor(
    private context: vscode.ExtensionContext,
    private gameId: string
  ) {}

  private _onDidChangeTreeData: vscode.EventEmitter<ScoreItem | undefined> =
    new vscode.EventEmitter<ScoreItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<ScoreItem | undefined> =
    this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: ScoreItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<ScoreItem[]> {
    return this.getScores();
  }

  private getScores(): Thenable<ScoreItem[]> {
    const scoresPath = path.join(
      this.context.globalStorageUri.fsPath,
      `${this.gameId}-scores.json`
    );
    if (fs.existsSync(scoresPath)) {
      const scoresData = JSON.parse(
        fs.readFileSync(scoresPath, 'utf8')
      ) as Score[];
      const sortedScores = scoresData.sort((a, b) => b.score - a.score);
      return Promise.resolve(
        sortedScores.map(score => new ScoreItem(score.player, score.score))
      );
    }
    return Promise.resolve([]);
  }
}

class ScoreItem extends vscode.TreeItem {
  constructor(public readonly player: string, public readonly score: number) {
    super(`${player}: ${score}점`);
  }
}
