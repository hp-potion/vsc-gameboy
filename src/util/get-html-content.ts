import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { MetaData } from '../game/meta-data';

function addScoreScriptToHtml(htmlContent: string): string {
  const scoreScript = `
    <script>
      const vscode = acquireVsCodeApi();
      function sendScore(player, score) {
        vscode.postMessage({
          command: 'sendScore',
          score: score,
          player: player
        });
      }
    </script>
  `;

  return htmlContent.replace(/<\/body>/, scoreScript + '</body>');
}

function getHtmlContent(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  game: MetaData
): string {
  let htmlContent = fs.readFileSync(
    path.join(context.extensionPath, 'resource/game', game.id, game.root),
    'utf8'
  );

  htmlContent = addScoreScriptToHtml(htmlContent);

  htmlContent = htmlContent.replace(
    /(href|src|data)="(?!https)([^"]*)"/g,
    (_: any, type: 'href' | 'src' | 'data', extraPath: string) => {
      const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'resource/game', game.id, extraPath)
      );
      const webViewPath = webview.asWebviewUri(onDiskPath);
      return `${type}="${webViewPath}"`;
    }
  );

  return htmlContent;
}
export default getHtmlContent;
