import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const numbers: number[] = [];

const askForNumber = (): Promise<void> => {
  return new Promise((resolve) => {
    rl.question('Enter a number (0 to exit): ', (input) => {
      const num = parseInt(input, 10);
      if (num === 0) {
        rl.close();
        resolve();
      } else {
        numbers.push(num);
        console.log(`You entered: ${num}`);
        resolve(askForNumber()); // Recursively ask for next number
      }
    });
  });
};

const startGame = async () => {
  console.log('Welcome to the CLI Number Game!');
  await askForNumber();
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  console.log(`The sum of all numbers is: ${sum}`);
};

startGame();
