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
const metaData: MetaData[] = [
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
    id: 'suika-game',
    title: 'Suika',
    description: 'Suika like game',
    author: 'Junman Choi',
    root: 'index.html',
    icon: {
      light: 'suika.svg',
      dark: 'suika.svg',
    },
  },
  {
    id: 'mine-sweeper',
    title: 'Mine Sweeper',
    description: 'Find hidden mine',
    author: 'Cozy Coder',
    root: 'index.html',
    icon: {
      light: 'mine-sweeper.svg',
      dark: 'mine-sweeper.svg',
    },
  },
];

export default metaData;
export type { MetaData };
