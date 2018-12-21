import React from 'react';
import PropTypes from 'prop-types';
import styles from './GridTable.module.css';


const GridTable = ({ children }) => <ul className={styles.tableList}>{children}</ul>;

GridTable.propTypes = { children: PropTypes.node };

export default GridTable;
