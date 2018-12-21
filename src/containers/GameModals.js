import { connect } from 'react-redux';
import GameModals from '../components/GameModals/GameModals';


const mapStateToProps = ({ modals }) => ({
  active: Object.values(modals).some(open => open),
});

export default connect(mapStateToProps)(GameModals);
