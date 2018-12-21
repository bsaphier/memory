import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';


const ModalTitle = ({ children }) => <div className={styles.title}>{children}</div>;

ModalTitle.propTypes = { children: PropTypes.node };

export default ModalTitle;
