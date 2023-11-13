import * as vscode from 'vscode';
import path from 'path';

// TreeDataProvider를 구현하여 VSCode의 트리 뷰에 데이터를 제공하는 클래스
export class GameProvider implements vscode.TreeDataProvider<GameItem> {

  onDidChangeTreeData?: vscode.Event<void | GameItem | GameItem[] | null | undefined> | undefined;
  
  // 트리 뷰의 각 아이템에 대해 TreeItem을 반환
  getTreeItem(element: GameItem): vscode.TreeItem {
    return element;
  }

  // 트리 뷰 아이템의 자식 아이템을 가져오는 메서드
  getChildren(element: GameItem): Thenable<GameItem[]> {
      // 현재는 더미데이터들 가져오고있음.
      return Promise.resolve(this.getGames());
    
  }

  // 실제 게임 데이터를 바탕으로 게임 목록을 생성하는 메서드 (현재는 더미 데이터 사용)
  private getGames(): GameItem[] {
    // 예시를 위한 더미 데이터
    return [
      new GameItem('tetris.', vscode.TreeItemCollapsibleState.None,'tetris'),
      new GameItem('numberGame', vscode.TreeItemCollapsibleState.None,'numberGame'),
      new GameItem('cliGame', vscode.TreeItemCollapsibleState.None,'cliGame')
    ];
  }
}

// vscode의 TreeItem을 확장하여 게임 아이템을 나타내는 클래스
class GameItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly gameId: string
  ) {
    super(label, collapsibleState);

    this.command = {
      command: 'gameboy-dev.helloWorld',
      title: 'Open Game',
      arguments: [this.gameId]
    };

    // 아이콘 경로 설정
    this.iconPath = {
      light: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'light', `${gameId}.svg`)),
      dark: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'dark', `${gameId}.svg`))
    };

  }
}
