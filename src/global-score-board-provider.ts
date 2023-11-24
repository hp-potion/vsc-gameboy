import * as vscode from 'vscode';

interface GlobalScore {
  user: string;
  score: number;
}

export class GlobalScoreBoardProvider implements vscode.TreeDataProvider<ScoreItem> {

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

  getChildren(element?: ScoreItem): Thenable<ScoreItem[]> {
      return this.getGlobalScores();
  }

  private async getGlobalScores(): Promise<ScoreItem[]> {
    try {
      const response = await ((await fetch(`http://54.180.141.215/score/?game=${this.gameId}`)).json());
      const scoresData: GlobalScore[] = response;
      const sortedScores = scoresData.sort((a, b) => b.score - a.score);

      return sortedScores.map(score => new ScoreItem(score.user, score.score));
    } catch (error) {
      console.error('Error fetching global scores:', error);
      return [];
    }
  }

}

class ScoreItem extends vscode.TreeItem {

  constructor(public readonly player: string, public readonly score: number) {
    super(`${player}: ${score} points`, vscode.TreeItemCollapsibleState.None);
  }
}