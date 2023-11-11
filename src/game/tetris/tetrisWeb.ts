import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class TetrisWeb {
    public static createOrShow(context: vscode.ExtensionContext) {
        const panel = vscode.window.createWebviewPanel(
            'tetrisGame', // 웹뷰의 유형
            'Tetris Game', // 사용자에게 표시될 패널 제목
            vscode.ViewColumn.One, // 웹뷰 패널을 표시할 에디터 열
            {
                enableScripts: true, // 스크립트 활성화
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src', 'game', 'tetris'))]
            }
        );

        panel.webview.html = this.getHtmlContent(context, panel.webview);
    }

    private static getHtmlContent(context: vscode.ExtensionContext, webview: vscode.Webview): string {
        const filePath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'game', 'tetris', 'index.html'));
        const htmlContent = fs.readFileSync(filePath.fsPath, 'utf8');
        return htmlContent;
    }
}
