import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameBoard.module.css';


const instructions = {
  doubles: 'Select two cards. If they don\'t match, remember what was on each card and where it was. The game is over when all the cards have been matched. Try to beat your best time!',
  triples: 'Select three cards. If they don\'t match, remember what was on each card and where it was. The game is over when all sets of three have been matched. Try to beat your best time!',
};

const GameBoardFooter = ({ level, onReset, cardTotal, className }) => {
  const isTriples = level === 'triples';
  return (
    <div className={className}>
      {level ? (
        <div className={styles.info}>
          <b>How To Play</b>
          <span>{instructions[isTriples ? level : 'doubles']}</span>
        </div>
      ) : null}
      <button disabled={cardTotal === 0} onClick={onReset}>
        {'Reset'}
      </button>
    </div>
  );
};

GameBoardFooter.propTypes = {
  level: PropTypes.string,
  onReset: PropTypes.func,
  className: PropTypes.string,
  cardTotal: PropTypes.number,
};

export default GameBoardFooter;
