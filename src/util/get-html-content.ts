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
    path.join(context.extensionPath, "resource/game", game.id, game.root),
    "utf8"
  );

  // 리소스 경로 변환 (스타일시트, 스크립트, 이미지 등)
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
