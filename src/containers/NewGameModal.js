import { connect } from 'react-redux';
import { onPlay } from '../action-creators/sound';
import { toggleModal } from '../action-creators/modals';
import NewGameModal from '../components/GameModals/NewGameModal';


const modalId = 'start';

const mapStateToProps = state => ({
  active: state.modals[modalId],
  level: state.game.selectedLevel,
});

const mapDispatchToProps = dispatch => ({
  onStartGame: () => {
    dispatch(onPlay('typewriter'));
    dispatch(toggleModal(modalId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGameModal);
