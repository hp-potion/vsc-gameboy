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

export default addScoreScriptToHtml;
