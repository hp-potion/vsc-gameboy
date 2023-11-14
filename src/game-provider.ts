import * as vscode from "vscode";
import path from "path";
import metaData from "./game/meta-data";

// TreeDataProvider를 구현하여 VSCode의 트리 뷰에 데이터를 제공하는 클래스
export class GameProvider implements vscode.TreeDataProvider<GameItem> {
  // 트리 뷰의 각 아이템에 대해 TreeItem을 반환
  getTreeItem(element: GameItem): vscode.TreeItem {
    return element;
  }

  // 트리 뷰 아이템의 자식 아이템을 가져오는 메서드
  getChildren(): Thenable<GameItem[]> {
    // 현재는 더미데이터들 가져오고있음.
    return Promise.resolve(this.getGames());
  }

  // 실제 게임 데이터를 바탕으로 게임 목록을 생성하는 메서드 (현재는 더미 데이터 사용)
  private getGames(): GameItem[] {
    const games = metaData.map((game) => {
      return new GameItem(
        game.title,
        vscode.TreeItemCollapsibleState.None,
        game.id
      );
    });

    return games;
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
      command: "vsc-gameboy.openGame",
      title: "Open Game",
      arguments: [this.gameId],
    };

    // 아이콘 경로 설정
    if (metaData.find((game) => game.id === gameId)?.icon) {
      this.iconPath = {
        light: vscode.Uri.file(
          path.join(__filename, `../../resource/icon/light/${gameId}-light.svg`)
        ),
        dark: vscode.Uri.file(
          path.join(__filename, `../../resource/icon/dark/${gameId}-dark.svg`)
        ),
      };
    }
  }
}
