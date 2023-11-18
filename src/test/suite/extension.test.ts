import * as assert from 'assert';
import * as vscode from 'vscode';
import getHtmlContent from '../../util/get-html-content';
import metaData, { MetaData } from '../../game/meta-data';
import createWebviewPanel from '../../util/create-webview-panel';
import * as path from 'path';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('vsc-gameboy run test suite');

  metaData.forEach(game => {
    test(`Open and Close ${game.id} panel Test`, async () => {
      // "vsc-gameboy.openGame" 커맨드 호출
      vscode.commands.executeCommand('vsc-gameboy.openGame', game.id);

      const Mockcontext = {
        extensionUri: vscode.Uri.parse('mock-uri'),
        extensionPath: path.join(__dirname, '../../../'), // 현재 파일 위치 기준으로 상위 디렉토리를 지정
        // 다른 필요한 ExtensionContext 속성을 여기에 추가
      } as vscode.ExtensionContext;

      // 웹뷰 패널 생성 및 확인
      const panel = createWebviewPanel(Mockcontext, game);
      assert.ok(panel);

      // 웹뷰 패널의 HTML 컨텐츠 확인
      const htmlContent = getHtmlContent(Mockcontext, panel.webview, game);
      assert.ok(htmlContent);

      // HTML 유효성 검사
      // const issues = HTMLHint.verify(htmlContent);
      // console.log(issues);
      // assert.strictEqual(issues.length, 0, 'HTML 유효성 검사 실패');

      // 웹뷰 패널이 보여지는지 확인
      assert.strictEqual(panel.visible, true);

      // 웹뷰 패널 해제
      panel.dispose();
    });
  });

