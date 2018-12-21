import React from 'react';
import PropTypes from 'prop-types';
import MatchesTable from '../../containers/MatchesTable';
import CardTable from '../../containers/CardTable';
import GameBoardFooter from './GameBoardFooter';
import GameBoardHeaderPrimary from './GameBoardHeaderPrimary';
import GameBoardHeaderSecondary from './GameBoardHeaderSecondary';
import styles from './GameBoard.module.css';


function classNameRow(style) {
  return `${styles.row} ${style}`;
}

function classNameHeader(style) {
  return `${styles.tableHeader} ${style}`;
}


export default class GameBoard extends React.Component {
  state = { muteTimer: false };

  handleTimerMute = () => {
    this.setState(state => ({ muteTimer: !state.muteTimer }));
  }

  componentDidMount() {
    this.props.onLand();
  }

  componentDidUpdate() {
    const { selectedCards, cardsById, onNoMatch, onMatch, level } = this.props;
    const isTriples = level === 'triples';
    if (!isTriples && selectedCards.length === 2) {
      const card1 = cardsById[selectedCards[0]];
      const card2 = cardsById[selectedCards[1]];
      if (card1.symbol === card2.symbol) {
        setTimeout(() => onMatch(card1.id, card2.id), 300);
      } else {
        setTimeout(() => onNoMatch(), 900);
      }
    } else if (isTriples && selectedCards.length === 3) {
      const card1 = cardsById[selectedCards[0]];
      const card2 = cardsById[selectedCards[1]];
      const card3 = cardsById[selectedCards[2]];
      if (card1.symbol === card2.symbol && card1.symbol === card3.symbol) {
        setTimeout(() => onMatch(card1.id, card2.id, card3.id), 300);
      } else {
        setTimeout(() => onNoMatch(), 900);
      }
    }
  }

  render() {
    const { cards, level, loading, onReset, soundOff, highScore, matchesTotal } = this.props;
    return (
      !loading && (
        <div className={styles.container}>
          <div className={`${styles.disabledField} ${level ? null : styles.active}`} />
          <div className={classNameRow(styles.gameContent)}>
            <div className={styles.gameWrapper}>
              <GameBoardHeaderPrimary
                className={classNameHeader(styles.game)}
                soundOff={soundOff}
                highScore={highScore}
                muteTimer={this.state.muteTimer}
                onTimerMute={this.handleTimerMute}
              />
              <CardTable />
            </div>
            <div className={styles.matchWrapper}>
              <GameBoardHeaderSecondary
                className={classNameHeader(styles.matches)}
                isTriples={level === 'triples'}
                cardTotal={cards.length}
                matchTotal={matchesTotal}
              />
              <MatchesTable />
            </div>
          </div>
          <GameBoardFooter
            className={classNameRow(styles.gameActions)}
            level={level}
            onReset={onReset}
            cardTotal={cards.length}
          />
        </div>
      )
    );
  }
}

GameBoard.propTypes = {
  onLand: PropTypes.func,
  level: PropTypes.string,
  loading: PropTypes.bool,
  onMatch: PropTypes.func,
  onReset: PropTypes.func,
  soundOff: PropTypes.bool,
  onNoMatch: PropTypes.func,
  highScore: PropTypes.number,
  matchesTotal: PropTypes.number,
  selectedCards: PropTypes.arrayOf(PropTypes.number),
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      symbol: PropTypes.string,
    })
  ),
  cardsById: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      symbol: PropTypes.string,
    })
  ),
};
