import * as vscode from 'vscode';
import { MetaData } from '../game/meta-data';

function createWebviewPanel(
  context: vscode.ExtensionContext, // 확장 기능의 컨텍스트
  game: MetaData // 게임 메타데이터
): vscode.WebviewPanel {
  return vscode.window.createWebviewPanel(
    game.id, // 웹뷰 유형 (게임 ID 사용)
    game.title, // 사용자에게 보여질 패널 제목
    vscode.ViewColumn.Active, // 웹뷰를 표시할 에디터 열
    {
      retainContextWhenHidden: true, // 숨겨졌을 때도 상태 유지
      enableScripts: true, // 스크립트 활성화
      localResourceRoots: [
        // 로컬 리소스 루트 설정
        vscode.Uri.file(
          vscode.Uri.joinPath(context.extensionUri, 'src/game', game.id).fsPath
        ),
        vscode.Uri.file(
          vscode.Uri.joinPath(context.extensionUri, 'resource/game', game.id)
            .fsPath
        ),
      ],
    }
  );
}

export default createWebviewPanel;
