import React from 'react';
import PropTypes from 'prop-types';
// import SuccessModal from '../../containers/SuccessModal';
import LandingModal from '../../containers/LandingModal';
// import NewGameModal from '../../containers/NewGameModal';
import ModalViewer from '../Modal/ModalViewer';


const GameModals = ({ active }) => (
  <ModalViewer active={active}>
    {/* <SuccessModal /> */}
    <LandingModal />
    {/* <NewGameModal /> */}
  </ModalViewer>
);

GameModals.propTypes = {
  active: PropTypes.bool,
};

export default GameModals;
