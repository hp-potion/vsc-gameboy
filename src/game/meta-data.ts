type MetaData = {
  id: string;
  title: string;
  description: string;
  author: string;
  root: string;
  icon: {
    light: string;
    dark: string;
  };
};

/**
 * Meta data for the games
 */
const metaData = [
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'A simple tetris game',
    author: 'Michael Karen',
    root: 'index.html',
    icon: {
      light: 'tetris.svg',
      dark: 'tetris.svg',
    },
  },
  {
    id: 'star-crusade',
    title: 'star-crusade',
    description: 'Are you ready to embark on the journey?',
    author: 'markets',
    root: 'index.html',
    icon: {
      light: 'star-crusade.svg',
      dark: 'star-crusade.svg',
    },
  },
  {
    id: 'star-crusade',
    title: 'star-crusade',
    description: 'Are you ready to embark on the journey?',
    author: 'markets',
    root: 'index.html',
    icon: {
      light: 'star-crusade.svg',
      dark: 'star-crusade.svg',
    },
  },
  {
    id: 'number-game',
    title: 'Number Game',
    description: 'Guess a number between 1 and 10',
    author: 'Sungjun Park',
    root: 'index.ts',
    icon: {
      light: 'tetris.svg',
      dark: 'tetris.svg',
    },
  },
];

export default metaData;
export type { MetaData };
