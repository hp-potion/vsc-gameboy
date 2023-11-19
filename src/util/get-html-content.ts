import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { MetaData } from "../game/meta-data";

function getHtmlContent(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  game: MetaData
): string {
  let htmlContent = fs.readFileSync(
    path.join(context.extensionPath, 'resource/game', game.id, game.root),
    'utf8'
  );

  const scoreScript = `
    <script>
      // 전역 범위에서 VS Code API 인스턴스 획득
      const vscode = acquireVsCodeApi();

      // 점수 전송 함수
      function sendScore(player, score) {
        console.log("player: ", player);
        console.log("score: ", score);
        vscode.postMessage({
          command: 'sendScore',
          score: score,
          player: player
        });
      }
    </script>
  `;
    
  htmlContent = htmlContent.replace(
    /<\/body>/,
    scoreScript + '</body>'
  );
  console.log('htmlContent',htmlContent);

  htmlContent = htmlContent.replace(
    /(href|src|data)="(?!https)([^"]*)"/g,
    (_: any, type: "href" | "src" | "data", extraPath: string) => {
      const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, "resource/game", game.id, extraPath)
      );
      const webViewPath = webview.asWebviewUri(onDiskPath);
      return `${type}="${webViewPath}"`;
    }
  );

  return htmlContent;
}
export default getHtmlContent;
