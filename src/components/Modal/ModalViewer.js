import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';


const ModalViewer = ({ active, children }) => {
  const containerStyle = active
    ? `${styles.modalsContainer} ${styles.active}`
    : styles.modalsContainer;
  return (
    <div className={containerStyle}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

ModalViewer.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default ModalViewer;
