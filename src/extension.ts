import * as vscode from "vscode";
import { GameProvider } from "./game-provider";
import metaData, { MetaData } from "./game/meta-data";
import getHtmlContent from "./util/get-html-content";

//WebView 관리 맵(game.id, panel instance)
const openWebviews = new Map<string, vscode.WebviewPanel>();

export function activate(context: vscode.ExtensionContext) {
  // GameProvider 인스턴스 생성
  const gameProvider = new GameProvider();
  // 'gameExplorer' 뷰 컨테이너에 대한 TreeDataProvider로 gameProvider를 등록
  vscode.window.registerTreeDataProvider("gameExplorer", gameProvider);
  // 'gameExtension.openGame' 커맨드를 등록하고, 실행될 때 createGameWebview 함수를 호출
  const openGamePanel = (context: vscode.ExtensionContext, game: MetaData) => {
    if(openWebviews.has(game.id)){
      const webViewPanel = openWebviews.get(game.id);
      webViewPanel?.reveal();
    } else {
      const panel = vscode.window.createWebviewPanel(
        game.id, // 웹뷰의 유형
        game.title, // 사용자에게 표시될 패널 제목
        vscode.ViewColumn.Active, // 웹뷰 패널을 표시할 에디터 열
        {
          retainContextWhenHidden: true,
          enableScripts: true, // 스크립트 활성화
          localResourceRoots: [
            vscode.Uri.file(
              vscode.Uri.joinPath(context.extensionUri, "src", "game", game.id)
                .fsPath
            ),
          ],
        }
      );
      panel.webview.html = getHtmlContent(context, panel.webview, game);

      openWebviews.set(game.id, panel);

      panel.onDidDispose(() => openWebviews.delete(game.id));
    }
    
  };

  let openGameCommand = vscode.commands.registerCommand(
    "vsc-gameboy.openGame",
    (gameId) => {
      let game = metaData.find((game) => game.id === gameId);
      if (!game) {
        return;
      }
      openGamePanel(context, game);
    }
  );

  // 커맨드를 확장 프로그램의 context에 추가하여 활성화 상태 유지
  context.subscriptions.push(openGameCommand);
}

// 확장 프로그램이 비활성화될 때 호출되는 메서드
export function deactivate() {}
