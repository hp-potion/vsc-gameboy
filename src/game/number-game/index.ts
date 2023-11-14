import * as vscode from "vscode";
import { guessNumberGame } from "./numbergame";

export function numberGameWeb(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "guessTheNumberGame",
    "Guess the Number Game",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.html = getWebviewContent();

  const correctNumber = Math.floor(Math.random() * 10) + 1; // 1 에서 10사이값

  panel.webview.onDidReceiveMessage(
    (message) => {
      if (message.command === "guess") {
        const result = guessNumberGame(message.guess, correctNumber);
        panel.webview.postMessage({ command: "result", result });
      }
    },
    undefined,
    context.subscriptions
  );
}

function getWebviewContent(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Guess the Number Game</title>
    </head>
    <body>
      <h1>Guess the Number Game</h1>
      <input type="number" id="guessInput" placeholder="Enter your guess (1-10)" />
      <button id="guessButton">Guess!</button>
      <div id="result"></div>

      <script>
        const vscode = acquireVsCodeApi();
        const guessButton = document.getElementById('guessButton');
        const guessInput = document.getElementById('guessInput');
        const resultDiv = document.getElementById('result');

        guessButton.addEventListener('click', () => {
          const guess = parseInt(guessInput.value, 10);
          vscode.postMessage({ command: 'guess', guess });
        });

        window.addEventListener('message', event => {
          const message = event.data;
          switch (message.command) {
            case 'result':
              resultDiv.textContent = message.result;
              break;
          }
        });
      </script>
    </body>
    </html>
  `;
}
