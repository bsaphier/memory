import { connect } from 'react-redux';
import { onPlay } from '../action-creators/sound';
// import { loadInitialGameData } from '../action-creators/game';
// import { toggleModal } from '../action-creators/modals';
import LandingModal from '../components/GameModals/LandingModal';


const modalId = 'landing';

const mapStateToProps = state => ({
  loading: state.status.cards,
  active: state.modals[modalId],
});

const mapDispatchToProps = dispatch => ({
  onLoadGameData: () => {
    dispatch(onPlay('typewriter'));
    // dispatch(loadInitialGameData()).then(() => dispatch(toggleModal(modalId)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingModal);
