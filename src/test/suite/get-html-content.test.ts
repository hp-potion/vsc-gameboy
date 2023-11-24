import assert from 'assert';
import getHtmlContent from '../../util/get-html-content';
import * as vscode from 'vscode';
import * as path from 'path';
import type { MetaData } from '../../game/meta-data';

suite('get html content unit test', () => {
  const context = {
    extensionUri: vscode.Uri.parse('mock-uri'),
    extensionPath: path.join(__dirname, '../../../'), // 현재 파일 위치 기준으로 상위 디렉토리를 지정
    globalState: {
      get: (key: string) => {
        if (key === 'user') {
          return 'test-user';
        }
      },
    },
    // 다른 필요한 ExtensionContext 속성을 여기에 추가
  } as vscode.ExtensionContext;

  const panel = vscode.window.createWebviewPanel(
    'test',
    'test',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );

  const metaData: MetaData = {
    id: 'test',
    title: 'test',
    description: 'test',
    author: 'test',
    root: 'test.html',
    icon: {
      dark: 'test',
      light: 'test',
    },
  };

  const expectedHtmlContent = `<script src="${panel.webview.asWebviewUri(
    vscode.Uri.file(
      path.join(context.extensionPath, 'resource/game', metaData.id)
    )
  )}/index.js"></script>
`;

  test('change src path to vscode uri', () => {
    assert.equal(
      expectedHtmlContent.trim(),
      getHtmlContent(context, panel.webview, metaData).trim()
    );
  });
});
