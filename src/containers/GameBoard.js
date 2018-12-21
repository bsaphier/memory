import { connect } from 'react-redux';
import { onPlay } from '../action-creators/sound';
// import { resetGame } from '../action-creators/game';
import { toggleModal } from '../action-creators/modals';
// import { noMatch, match } from '../action-creators/cards';
import getAppLoadStatus from '../selectors/getAppLoadStatus';
import getActiveCards from '../selectors/getActiveCards';
import GameBoard from '../components/GameBoard/GameBoard';


const mapStateToProps = state => ({
  soundOff: state.game.mute,
  cards: getActiveCards(state),
  level: state.game.selectedLevel,
  loading: getAppLoadStatus(state),
  cardsById: state.cards.cardsById,
  selectedCards: state.cards.selectedCards,
  matchesTotal: state.cards.matches.length,
  highScore: state.game.highScore[state.game.selectedLevel],
});

const mapDispatchToProps = dispatch => ({
  onLand: () => dispatch(toggleModal('landing')),
  onMatch: (id1, id2, id3) => {
    // dispatch(match(id1, id2, id3));
    dispatch(onPlay('cardFlip'));
  },
  onNoMatch: () => {
    // dispatch(noMatch());
    dispatch(onPlay('cardTouch'));
  },
  onReset: () => {
    // dispatch(resetGame());
    dispatch(onPlay('typewriter'));
    dispatch(toggleModal('start'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
