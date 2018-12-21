import { connect } from 'react-redux';
import getTableRows from '../selectors/getTableRows';
import MatchesTable from '../components/MatchesTable/MatchesTable';


const mapStateToProps = state => ({
  rows: getTableRows(state),
  matches: state.cards.matches,
  level: state.game.selectedLevel,
  cardsById: state.cards.cardsById,
  total: state.game.selectedLevel.length
    ? state.cards.cardsByLevel[state.game.selectedLevel].length
    : 0,
});

export default connect(mapStateToProps)(MatchesTable);
