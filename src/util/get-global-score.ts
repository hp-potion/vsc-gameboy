import * as vscode from 'vscode';

async function getGlobalScoreList(
  gameId: string,
  player: string,
  score: number
) {
  try {
    await fetch(`${process.env.SCORE_SERVER_PATH}/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game: gameId,
        user: player,
        score: score,
      }),
    });

    // 성공적으로 요청을 보냈을 때의 처리
  } catch (error) {
    // 요청 실패 또는 오류 발생 시의 처리
    console.error(error);
  }
}

export default getGlobalScoreList;
