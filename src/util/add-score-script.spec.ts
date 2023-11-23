import * as assert from 'assert';
import addScoreScriptToHtml from './add-score-script';
describe('Add score script to html', function () {
  describe('add function', function () {
    const inputHtml = `
      <html>
        <body>
        </body>
      </html>
    `;
    const mockHtml = `
      <html>
        <body>
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
    </body>
      </html>
    `;
    it('should equal to mock stringified html', function () {
      console.log(addScoreScriptToHtml(inputHtml).replaceAll('\n', '').trim());
      assert.equal(
        addScoreScriptToHtml(inputHtml).replaceAll('\n', '').trim(),
        mockHtml.replaceAll('\n', '').trim()
      );
    });
  });
});
