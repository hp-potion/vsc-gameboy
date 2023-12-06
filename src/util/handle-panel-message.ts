import * as vscode from 'vscode';
import saveScore from './save-score';
import { ScoreBoardProvider } from '../score-board-provider';
import { GlobalScoreBoardProvider } from '../global-score-board-provider';
import setGlobalScore from './set-global-score';

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
  scoreBoardProvider: ScoreBoardProvider,
  globalScoreBoardProvider: GlobalScoreBoardProvider
) {
  panel.webview.onDidReceiveMessage(
    async message => {
      if (message.command === 'sendScore') {
        const score = message.score;
        const player = message.player;
        saveScore(context, gameId, { player, score });
        scoreBoardProvider.refresh();

        await setGlobalScore(gameId, player, score);
        await globalScoreBoardProvider.getChildren();
        globalScoreBoardProvider.refresh();
      }
    },
    undefined,
    context.subscriptions
  );
}
export default handlePanelMessages;
