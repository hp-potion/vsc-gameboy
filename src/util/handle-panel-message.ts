import * as vscode from 'vscode';
import saveScore from './save-score';
/**
 * message handler for a webview panel.
 * This function listense for messages sent from the webview and performs actions based on the message content.
 * @param panel
 * @param context
 * @param gameId
 */
function handlePanelMessages(
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext,
  gameId: string
) {
  panel.webview.onDidReceiveMessage(
    message => {
      if (message.command === 'sendScore') {
        const score = message.score;
        const player = message.player;
        saveScore(context, gameId, { player, score });
      }
    },
    undefined,
    context.subscriptions
  );
}
export default handlePanelMessages;
