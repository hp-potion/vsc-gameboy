export function guessNumberGame(input: number, correctNumber: number): string {
    if (input === correctNumber) {
      return "Congratulations! You've guessed the right number!";
    } else if (input < correctNumber) {
      return "Too low! Try again.";
    } else {
      return "Too high! Try again.";
    }
  }
  