import * as vscode from 'vscode';
import * as path from 'path';
import * as ts from 'typescript';
import * as fs from 'fs';
import { GameProvider } from './gameProvider';
import { numberGameWeb } from './game/numberGame/numbergameWeb';
import { TetrisWeb } from './game/tetris/tetrisWeb';

function compileTypeScript(filePath: string): string {
  const tsCode = fs.readFileSync(filePath, 'utf8');
  const jsCode = ts.transpileModule(tsCode, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const compiledFilePath = path.join(path.dirname(filePath), path.basename(filePath, '.ts') + '.js');
  fs.writeFileSync(compiledFilePath, jsCode);
  return compiledFilePath;
}

// 확장 프로그램이 활성화될 때 호출되는 메서드
export function activate(context: vscode.ExtensionContext) {
  console.log(context);
  // GameProvider 인스턴스 생성
  const gameProvider = new GameProvider();
  // 'gameExplorer' 뷰 컨테이너에 대한 TreeDataProvider로 gameProvider를 등록
  vscode.window.registerTreeDataProvider('gameExplorer', gameProvider);


  //Game ID 로 게임들을 분류를 해봐야할거같은데.. 어떻게 작업해야하나 감이안잡힘 / 우리가 직접 넣는거보다는, 자동화될만한게 없을까
  // 'gameExtension.openGame' 커맨드를 등록하고, 실행될 때 createGameWebview 함수를 호출
  let openGameCommand = vscode.commands.registerCommand('gameboy-dev.helloWorld', (gameId) => {
    console.log('context:',context);
    if (gameId === 'cliGame') {
      const tsFilePath = path.join(context.extensionPath, '/src/game/cliGame/cliGame.ts');
      const jsFilePath = compileTypeScript(tsFilePath);
      const terminal = vscode.window.createTerminal('CLI Game');
      terminal.sendText(`node ${jsFilePath}`);
      terminal.show();
    } else if (gameId === 'tetris') {
      TetrisWeb.createOrShow(context);

    } else if (gameId === 'numberGame') {
      numberGameWeb(context); // numbergameWeb.ts에서 export된 함수
    }

  });

  // 커맨드를 확장 프로그램의 context에 추가하여 활성화 상태 유지
  context.subscriptions.push(openGameCommand);
}

// 확장 프로그램이 비활성화될 때 호출되는 메서드
export function deactivate() {}
