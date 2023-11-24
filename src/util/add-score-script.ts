function addScoreScriptToHtml(htmlContent: string, userId: string): string {
  const scoreScript = `
      <script>
        const vscode = acquireVsCodeApi();
        function sendScore(score) {
          vscode.postMessage({
            command: 'sendScore',
            score: score,
            player: '${userId}'
          });
        }
      </script>
    `;

  return htmlContent.replace(/<\/body>/, scoreScript + '</body>');
}

export default addScoreScriptToHtml;
