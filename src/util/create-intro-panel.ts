import path from 'path';
import * as vscode from 'vscode';

function createIntroPanel(context: vscode.ExtensionContext) {
  const introPanel = vscode.window.createWebviewPanel(
    'intro',
    'vsc-gameboy',
    vscode.ViewColumn.One,
    {
      retainContextWhenHidden: true,
      enableScripts: true, // 스크립트 활성화
      localResourceRoots: [
        vscode.Uri.file(
          vscode.Uri.joinPath(context.extensionUri, 'resource/extension').fsPath
        ),
      ],
    }
  );

  const onDiskPath = vscode.Uri.file(
    path.join(context.extensionPath, 'resource/extension', 'intro.mp4')
  );

  const introPath = introPanel.webview.asWebviewUri(onDiskPath);

  introPanel.webview.html = `
    <html>
      <body>
        <video autoplay muted>
          <source src="${introPath}" type="video/mp4">
        </video>
      </body>
    </html>
  `;

  return introPanel;
}

export default createIntroPanel;
