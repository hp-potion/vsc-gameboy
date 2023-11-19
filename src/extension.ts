import * as vscode from "vscode";
import { GameProvider } from "./game-provider";
import { ScoreBoardProvider } from "./score-board-provider";
import metaData, { MetaData } from "./game/meta-data";
import getHtmlContent from "./util/get-html-content";
import path from "path";
import fs from "fs";

//WebView manage map(game.id, panel instance)
const openWebviews = new Map<string, vscode.WebviewPanel>();

// Function for creating directories
function ensureDirectoryExistence(directoryPath: string){
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true});
  }
}

// Game score generation function for local scoreboard(Use globalStorage)
function saveScore(context: vscode.ExtensionContext, gameId: string, scoreData: { player: string, score: number }) {
  // Create full path to file to save
  const scoresPath = path.join(context.globalStorageUri.fsPath, `${gameId}-scores.json`);
  console.log('scoresPath',scoresPath);
  const directoryPath = path.dirname(scoresPath);
  console.log('directoryPath',directoryPath);

  //Directory verification and creation functions
  ensureDirectoryExistence(directoryPath);

  let scores: { player: string, score: number }[] = [];

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

/**
 * message handler for a webview panel.
 * This function listense for messages sent from the webview and performs actions based on the message content.
 * @param panel 
 * @param context 
 * @param gameId 
 */
function handlePanelMessages(panel: vscode.WebviewPanel, context: vscode.ExtensionContext, gameId: string){
  panel.webview.onDidReceiveMessage(
    message => {
      if (message.command === 'sendScore') {
        const score = message.score;
        const player = message.player;
        console.log(score);
        saveScore(context, gameId, {player, score});
      }
    },
    undefined,
    context.subscriptions
  );

}

export function activate(context: vscode.ExtensionContext) {
  // GameProvider 인스턴스 생성
  const gameProvider = new GameProvider();
  // 'gameExplorer' 뷰 컨테이너에 대한 TreeDataProvider로 gameProvider를 등록
  vscode.window.registerTreeDataProvider("gameExplorer", gameProvider);
  // 'gameExtension.openGame' 커맨드를 등록하고, 실행될 때 createGameWebview 함수를 호출
  const openGamePanel = (context: vscode.ExtensionContext, game: MetaData) => {
    const scoreBoardProvider = new ScoreBoardProvider(context, game.id);
    vscode.window.registerTreeDataProvider('scoreList', scoreBoardProvider);

    if (openWebviews.has(game.id)) {
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
              vscode.Uri.joinPath(context.extensionUri, "src/game", game.id)
                .fsPath
            ),
            vscode.Uri.file(
              vscode.Uri.joinPath(
                context.extensionUri,
                "resource/game",
                game.id
              ).fsPath
            ),
          ],
        }
      );
      panel.webview.html = getHtmlContent(context, panel.webview, game);

      handlePanelMessages(panel, context, game.id);
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
