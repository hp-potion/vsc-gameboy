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
        function sendScore(score) {
          vscode.postMessage({
            command: 'sendScore',
            score: score,
            player: 'user'
          });
        }
      </script>
    </body>
      </html>
    `;
    it('should equal to mock stringified html', function () {
      assert.equal(
        addScoreScriptToHtml(inputHtml, 'user').replaceAll('\n', '').trim(),
        mockHtml.replaceAll('\n', '').trim()
      );
    });
  });
});
