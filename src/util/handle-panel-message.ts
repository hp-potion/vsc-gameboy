import * as vscode from 'vscode';
import saveScore from './save-score';
import { ScoreBoardProvider } from '../score-board-provider';

/**
 * message handler for a webview panel.
 * This function listense for messages sent from the webview and performs actions based on the message content.
 * @param panel
 * @param context
 * @param gameId
 * @param scoreBoardProvider
 */
function handlePanelMessages(
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext,
  gameId: string,
  scoreBoardProvider: ScoreBoardProvider
) {
  panel.webview.onDidReceiveMessage(
    message => {
      if (message.command === 'sendScore') {
        const score = message.score;
        const player = message.player;
        saveScore(context, gameId, { player, score });
        scoreBoardProvider.refresh();
      }
    },
    undefined,
    context.subscriptions
  );
}
export default handlePanelMessages;
