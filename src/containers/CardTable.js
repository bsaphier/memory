import { connect } from 'react-redux';
import getActiveCards from '../selectors/getActiveCards';
import getTableRows from '../selectors/getTableRows';
import { selectCard } from '../action-creators/cards';
import { startGame } from '../action-creators/game';
import { onPlay } from '../action-creators/sound';
import CardTable from '../components/CardTable/CardTable';


const mapStateToProps = state => ({
  rows: getTableRows(state),
  running: state.game.playing,
  cards: getActiveCards(state),
  level: state.game.selectedLevel,
  selectedCards: state.cards.selectedCards,
});

const mapDispatchToProps = dispatch => ({
  onSelectFirstCard: card => {
    dispatch(startGame());
    dispatch(onPlay('cardDrag'));
    dispatch(selectCard(card));
  },
  onSelectCard: card => {
    dispatch(onPlay('cardDrag'));
    dispatch(selectCard(card));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTable);
