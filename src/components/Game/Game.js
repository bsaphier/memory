import React from 'react';
import GameBoard from '../../containers/GameBoard';
import GameToolbar from '../../containers/GameToolbar';
import GameModals from '../../containers/GameModals';
import TitleBar from '../TitleBar/TitleBar';
import styles from './Game.css';


const Game = () => (
  <div className={styles.page}>
    <TitleBar title="Memory Game" />
    <div className={styles.contentWrapper}>
      <GameToolbar />
      <GameBoard />
      <GameModals />
    </div>
  </div>
);

export default Game;
