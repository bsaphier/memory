import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';


const ModalContent = ({ children }) => <div className={styles.content}>{children}</div>;

ModalContent.propTypes = { children: PropTypes.node };

export default ModalContent;
